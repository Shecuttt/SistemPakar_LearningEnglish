const { prisma } = require("@/lib/prisma");
const { NextResponse } = require("next/server");

export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();

  try {
    const updatedQuestion = await prisma.question.update({
      where: { id: id },
      data: body,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await prisma.question.delete({
      where: { id: id },
    });
    return NextResponse.json(
      { message: "Question deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
