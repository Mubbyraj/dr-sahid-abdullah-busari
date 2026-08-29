import { NextResponse } from "next/server";

import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { sendNewQuestionNotification } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const question = String(body.question || "").trim();
    const category = String(body.category || "").trim();

    // Only the question itself is required.
    if (!question) {
      return NextResponse.json(
        { error: "Please enter your question." },
        { status: 400 }
      );
    }

    // Validate email only when one was provided.
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: "Please enter a valid email address." },
          { status: 400 }
        );
      }
    }

    const supabase = createSupabaseAdminClient();

    /*
     * Public submissions are ALWAYS created as pending.
     *
     * We intentionally do not accept status, answer, answered_at,
     * or published_at from the visitor. This prevents someone from
     * submitting a question directly as published or answered.
     */
    const { data, error } = await supabase
      .from("questions")
      .insert({
        name: name || null,
        email: email || null,
        question,
        category: category || null,
        answer: null,
        status: "pending",
        answered_at: null,
        published_at: null,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Question submission error:", error);

      return NextResponse.json(
        {
          error: "Unable to submit your question. Please try again.",
        },
        { status: 500 }
      );
    }

    /*
     * Notification failure should not make the question submission
     * appear unsuccessful. The question has already been saved.
     */
    const notification = await sendNewQuestionNotification({
      name,
      email,
      question,
      category,
    });

    if (!notification.success) {
      console.error(
        "Question saved, but notification email failed:",
        notification.error
      );
    }

    return NextResponse.json(
      {
        success: true,
        id: data.id,
        message:
          "Your question has been submitted successfully. It will be reviewed before publication.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Question API error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}