import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * GET /api/news
 * Returns all news items for the logged-in user
 */
export async function GET(req: NextRequest) {
  const userId = await getUserIdFromSession();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // In real apps, this comes from a database or CMS
  const news = [
    {
      id: 1,
      title: "Platform Launch",
      category: "company",
      publishedAt: "2026-02-01",
      summary: "Our new networking platform is now live."
    },
    {
      id: 2,
      title: "New Employer Partners",
      category: "careers",
      publishedAt: "2026-02-10",
      summary: "We partnered with 12 new hiring companies."
    }
  ];

  return NextResponse.json(news);
}

/**
 * POST /api/news
 * Creates a new news item
 */
export async function POST(req: NextRequest) {
  const userId = await getUserIdFromSession();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, category, summary } = body;

  if (!title || !category || !summary) {
    return NextResponse.json(
      { error: "Missing fields" },
      { status: 400 }
    );
  }

  // In real apps:
  // - Check role (admin / editor)
  // - Validate content
  // - Save to DB

  const newsItem = {
    id: 123,
    title,
    category,
    summary,
    authorId: userId,
    publishedAt: new Date().toISOString(),
    status: "published"
  };

  return NextResponse.json(newsItem, { status: 201 });
}

/**
 * Shared helper
 * Reads auth cookie and extracts user id
 */
async function getUserIdFromSession(): Promise<string | null> {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) return null;

  // Normally you'd verify a JWT here
  // e.g. jwt.verify(token, SECRET)
  return "user_42";
}
