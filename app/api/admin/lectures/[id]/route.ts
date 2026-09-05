import { NextResponse } from "next/server";

import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { createSupabaseServerClient } from "@/lib/supabase-server";

type RouteContext = {
  params: Promise<{ id: string }>;
};

type Lecture = {
  id: string;
  title: string;
  video_url: string | null;
  thumbnail_url: string | null;
};

function getStoragePath(
  url: string | null,
  expectedBucket: "lecture-videos" | "lecture-thumbnails"
): string | null {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const marker = `/storage/v1/object/public/${expectedBucket}/`;

    if (!parsed.pathname.startsWith(marker)) {
      return null;
    }

    const path = parsed.pathname.slice(marker.length);

    return path ? decodeURIComponent(path) : null;
  } catch {
    return null;
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Lecture ID is required." },
        { status: 400 }
      );
    }

    const supabaseServer = await createSupabaseServerClient();

    const {
      data: { user },
      error: userError,
    } = await supabaseServer.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "You must be authenticated." },
        { status: 401 }
      );
    }

    const { data: profile, error: profileError } = await supabaseServer
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError || profile?.role !== "admin") {
      return NextResponse.json(
        { error: "You do not have permission to edit lectures." },
        { status: 403 }
      );
    }

    const body = await request.json();

    const title =
      typeof body.title === "string" ? body.title.trim() : "";
    const slug =
      typeof body.slug === "string" ? body.slug.trim() : "";

    if (!title) {
      return NextResponse.json(
        { error: "Lecture title is required." },
        { status: 400 }
      );
    }

    if (!slug) {
      return NextResponse.json(
        { error: "Lecture slug is required." },
        { status: 400 }
      );
    }

    if (!/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json(
        {
          error:
            "Lecture slug may only contain lowercase letters, numbers, and hyphens.",
        },
        { status: 400 }
      );
    }

    const status =
      body.status === "published"
        ? "published"
        : body.status === "draft"
          ? "draft"
          : null;

    if (!status) {
      return NextResponse.json(
        { error: "Lecture status must be draft or published." },
        { status: 400 }
      );
    }

    // Service-role access is used only after the request has been authorized.
    const supabaseAdmin = createSupabaseAdminClient();

    const {
      data: existingLecture,
      error: existingLectureError,
    } = await supabaseAdmin
      .from("lectures")
      .select("id, status, published_at")
      .eq("id", id)
      .single();

    if (existingLectureError || !existingLecture) {
      return NextResponse.json(
        { error: "Lecture not found." },
        { status: 404 }
      );
    }

    let publishedAt = existingLecture.published_at;

    if (status === "draft") {
      publishedAt = null;
    } else if (existingLecture.status === "draft") {
      publishedAt = new Date().toISOString();
    }

    const { data: updatedLecture, error: updateError } =
      await supabaseAdmin
        .from("lectures")
        .update({
          title,
          slug,
          category:
            typeof body.category === "string" && body.category.trim()
              ? body.category.trim()
              : null,
          description:
            typeof body.description === "string" &&
            body.description.trim()
              ? body.description.trim()
              : null,
          transcript:
            typeof body.transcript === "string" &&
            body.transcript.trim()
              ? body.transcript.trim()
              : null,
          video_url:
            typeof body.video_url === "string" &&
            body.video_url.trim()
              ? body.video_url.trim()
              : null,
          thumbnail_url:
            typeof body.thumbnail_url === "string" &&
            body.thumbnail_url.trim()
              ? body.thumbnail_url.trim()
              : null,
          status,
          published_at: publishedAt,
        })
        .eq("id", id)
        .select("*")
        .single();

    if (updateError) {
      console.error("Lecture update failed:", updateError);

      return NextResponse.json(
        { error: updateError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      lecture: updatedLecture,
    });
  } catch (error) {
    console.error("Unexpected lecture PATCH error:", error);

    return NextResponse.json(
      { error: "Unable to update lecture." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Lecture ID is required." },
        { status: 400 }
      );
    }

    // Verify the authenticated browser session.
    const supabaseServer = await createSupabaseServerClient();

    const {
      data: { user },
      error: userError,
    } = await supabaseServer.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "You must be signed in as an administrator." },
        { status: 401 }
      );
    }

    // Verify the authenticated user is an administrator.
    const { data: profile, error: profileError } = await supabaseServer
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError || profile?.role !== "admin") {
      return NextResponse.json(
        { error: "You do not have permission to delete lectures." },
        { status: 403 }
      );
    }

    // Service-role access is used only after the request has been authorized.
    const supabaseAdmin = createSupabaseAdminClient();

    const { data: lecture, error: lectureError } = await supabaseAdmin
      .from("lectures")
      .select("id, title, video_url, thumbnail_url")
      .eq("id", id)
      .single();

    if (lectureError || !lecture) {
      return NextResponse.json(
        { error: "Lecture not found." },
        { status: 404 }
      );
    }

    const lectureData = lecture as Lecture;

    const videoPath = getStoragePath(
      lectureData.video_url,
      "lecture-videos"
    );

    const thumbnailPath = getStoragePath(
      lectureData.thumbnail_url,
      "lecture-thumbnails"
    );

    // Delete the database record first so the application can never
    // retain a lecture pointing to a partially deleted media file.
    const { error: databaseDeleteError } = await supabaseAdmin
      .from("lectures")
      .delete()
      .eq("id", id);

    if (databaseDeleteError) {
      console.error(
        "Lecture database deletion failed:",
        databaseDeleteError
      );

      return NextResponse.json(
        {
          error:
            "The lecture could not be deleted. Its files were left untouched.",
        },
        { status: 500 }
      );
    }

    const cleanupWarnings: string[] = [];

    // Clean up the associated video after the database record is gone.
    if (videoPath) {
      const { error: videoDeleteError } = await supabaseAdmin.storage
        .from("lecture-videos")
        .remove([videoPath]);

      if (videoDeleteError) {
        console.error(
          "Lecture video cleanup failed:",
          videoDeleteError
        );

        cleanupWarnings.push(
          "The lecture was deleted, but its video file could not be removed from storage."
        );
      }
    }

    // Clean up the associated thumbnail.
    if (thumbnailPath) {
      const { error: thumbnailDeleteError } = await supabaseAdmin.storage
        .from("lecture-thumbnails")
        .remove([thumbnailPath]);

      if (thumbnailDeleteError) {
        console.error(
          "Lecture thumbnail cleanup failed:",
          thumbnailDeleteError
        );

        cleanupWarnings.push(
          "The lecture was deleted, but its thumbnail could not be removed from storage."
        );
      }
    }

    if (cleanupWarnings.length > 0) {
      return NextResponse.json({
        success: true,
        cleanupWarning: true,
        message: `Lecture "${lectureData.title}" was deleted, but some storage files could not be cleaned up.`,
        warnings: cleanupWarnings,
      });
    }

    return NextResponse.json({
      success: true,
      cleanupWarning: false,
      message: `Lecture "${lectureData.title}" was deleted successfully.`,
    });
  } catch (error) {
    console.error("Lecture deletion API error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong while deleting the lecture.",
      },
      { status: 500 }
    );
  }
}
