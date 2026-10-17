import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { error: "We couldn't read your RSVP. Please try again." },
      { status: 400 },
    );
  }

  const name = String(body.name ?? "").trim();
  const attending =
    body.attending === "yes" || body.attending === "no" ? body.attending : null;
  const guests = Number(body.guests);
  const message = String(body.message ?? "").trim().slice(0, 500);

  if (!name || name.length > 100) {
    return NextResponse.json({ error: "Enter your name." }, { status: 400 });
  }
  if (!attending) {
    return NextResponse.json(
      { error: "Choose whether you can come." },
      { status: 400 },
    );
  }
  if (
    attending === "yes" &&
    !(Number.isInteger(guests) && guests >= 1 && guests <= 10)
  ) {
    return NextResponse.json(
      { error: "Choose how many guests are coming, between 1 and 10." },
      { status: 400 },
    );
  }

  // TODO: store the RSVP. For now it is only logged on the server.
  // Good options: a database, Google Sheets via its API, or an email service.
  console.log("RSVP received", {
    name,
    attending,
    guests: attending === "yes" ? guests : 0,
    message,
    at: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
