import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const question = await prisma.question.findMany({
            orderBy: { orderNumber: "asc" },
        });
        return NextResponse.json(question, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function POST(req) {
    try {
        const { question_code, question, orderNumber } = await req.json();
        const newQuestion = await prisma.question.create({
            data: {
                question_code,
                question,
                orderNumber,
            },
        });
        return NextResponse.json(newQuestion, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
