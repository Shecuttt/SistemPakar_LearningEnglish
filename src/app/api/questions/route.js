const { prisma } = require("@/lib/prisma");
const { NextResponse } = require("next/server");

export async function GET() {
  try {
    const question = await prisma.question.findMany();
    return NextResponse.json(question, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const newQuestion = await prisma.question.create({
      data: body,
    });
    return NextResponse.json(newQuestion, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
