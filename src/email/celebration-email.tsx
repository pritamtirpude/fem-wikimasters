import { eq } from "drizzle-orm";
import db from "@/db";
import { articles, usersSync } from "@/db/schema";
import CelebrationTemplate from "@/email/celebration-template";
import resend from ".";

export async function sendCelebrationEmail(
  articleId: number,
  pageviews: number,
) {
  const BASE_URL = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const response = await db
    .select({
      email: usersSync.email,
      id: usersSync.id,
      title: articles.title,
      name: usersSync.name,
    })
    .from(articles)
    .leftJoin(usersSync, eq(articles.authorId, usersSync.id))
    .where(eq(articles.id, articleId));

  const { email, id, title, name } = response[0];

  if (!email) {
    console.log("❌ No email found for user id:", id);
    return;
  }

  const emailRes = await resend.emails.send({
    from: "WkiMasters <onboarding@resend.dev>",
    to: "pritam.tirpude9601@gmail.com",
    subject: `✨ Congratulations! Your article just hit ${pageviews} pageviews!`,
    react: (
      <CelebrationTemplate
        articleTitle={title}
        articleUrl={`${BASE_URL}/wiki/${articleId}`}
        name={name ?? "Friend"}
        pageviews={pageviews}
      />
    ),
  });

  if (!emailRes.error) {
    console.log(
      `📧 sent ${id} a celebration email for getting ${pageviews} on article ${articleId}`,
    );
  } else {
    console.log("❌ Failed to send email:", emailRes.error);
  }
}
