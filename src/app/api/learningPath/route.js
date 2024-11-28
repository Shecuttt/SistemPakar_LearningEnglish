import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
    try {
        const learningPaths = await prisma.learningPath.findMany({
            orderBy: { code: "asc" },
        });
        return NextResponse.json(learningPaths, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const { code, name, description, level } = await request.json();
        const learningPath = await prisma.learningPath.create({
            data: {
                code,
                name,
                description,
                level,
            },
        });
        return NextResponse.json(learningPath, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
