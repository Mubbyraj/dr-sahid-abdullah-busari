import { Resend } from "resend";

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ||
  "Dr. Saheed Abdullahi Busari <onboarding@resend.dev>";

const ADMIN_EMAIL = process.env.DR_SAHID_EMAIL;

export async function sendNewQuestionNotification({
  name,
  email,
  question,
  category,
}: {
  name?: string | null;
  email?: string | null;
  question: string;
  category?: string | null;
}) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured.");
    return {
      success: false,
      error: "Email service is not configured.",
    };
  }

  if (!ADMIN_EMAIL) {
    console.error("DR_SAHID_EMAIL is not configured.");
    return {
      success: false,
      error: "Admin email is not configured.",
    };
  }

  const resend = new Resend(apiKey);

  const result = await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: "New Question Submitted — Dr. Saheed Abdullahi Busari",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #172033;">
        <h2 style="color: #1d4ed8;">New Question Submitted</h2>

        <p>A new question has been submitted through the official website.</p>

        <hr />

        <p>
          <strong>Name:</strong><br />
          ${escapeHtml(name || "Anonymous")}
        </p>

        <p>
          <strong>Email:</strong><br />
          ${escapeHtml(email || "Not provided")}
        </p>

        <p>
          <strong>Category:</strong><br />
          ${escapeHtml(category || "General")}
        </p>

        <p>
          <strong>Question:</strong><br />
          ${escapeHtml(question)}
        </p>

        <hr />

        <p>
          Please log in to the administration dashboard to review and answer
          the question.
        </p>

        <p>
          <a
            href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/admin/questions"
            style="
              display:inline-block;
              padding:12px 18px;
              background:#1d4ed8;
              color:#ffffff;
              text-decoration:none;
              border-radius:8px;
              font-weight:bold;
            "
          >
            Review Question
          </a>
        </p>
      </div>
    `,
  });

  if (result.error) {
    console.error("Resend email error:", result.error);

    return {
      success: false,
      error: result.error.message,
    };
  }

  return {
    success: true,
    data: result.data,
  };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
