import { NextResponse } from "next/server";
import { sendNewSubscriberNotification } from "@/lib/email";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();

    if (!email) {
      return NextResponse.json(
        { error: "Email address is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const supabase = await createSupabaseServerClient();

    const { data: existingSubscriber, error: lookupError } = await supabase
      .from("newsletter_subscribers")
      .select("id, status")
      .eq("email", email)
      .maybeSingle();

    if (lookupError) {
      console.error("Subscriber lookup error:", lookupError);

      return NextResponse.json(
        { error: "Unable to process your subscription." },
        { status: 500 }
      );
    }

    if (existingSubscriber) {
      if (existingSubscriber.status === "inactive") {
        const { error: reactivateError } = await supabase
          .from("newsletter_subscribers")
          .update({ status: "active" })
          .eq("id", existingSubscriber.id);

        if (reactivateError) {
          console.error("Subscriber reactivation error:", reactivateError);

          return NextResponse.json(
            { error: "Unable to reactivate your subscription." },
            { status: 500 }
          );
        }

        return NextResponse.json({
          message: "Your subscription has been reactivated.",
        });
      }

      return NextResponse.json({
        message: "This email is already subscribed.",
      });
    }

    const { error: insertError } = await supabase
      .from("newsletter_subscribers")
      .insert({
        email,
        status: "active",
      });

    if (insertError) {
      return NextResponse.json(
        { error: "Unable to complete your subscription." },
        { status: 500 }
      );
    }

    const notification = await sendNewSubscriberNotification({ email });

    if (!notification.success) {
      console.error(
        "Subscriber notification failed:",
        notification.error
      );
    }


    return NextResponse.json(
      { message: "You have successfully subscribed." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Subscription API error:", error);

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
