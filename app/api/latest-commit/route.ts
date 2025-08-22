import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://api.github.com/repos/tomayyeung/tomay.dev/commits/main",
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("GitHub API error:", res.status, errorText);
      return NextResponse.json(
        { error: "GitHub API failed", status: res.status },
        { status: 500 }
      );
    }

    const commit = await res.json();
    const date = commit.commit.author.date;

    return NextResponse.json({ latestCommitDate: date });
  } catch (err) {
    console.error("API route error:", err);
    if (err instanceof Error){
      return NextResponse.json({ error: err.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "Internal Server Error"}, { status: 500 });
    }
  }
}
