import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (
      typeof body !== "object" ||
      body === null ||
      typeof (body as { name?: unknown }).name !== "string" ||
      typeof (body as { email?: unknown }).email !== "string" ||
      typeof (body as { message?: unknown }).message !== "string"
    ) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    await new Promise((r) => setTimeout(r, 800));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
