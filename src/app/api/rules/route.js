import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const rules = await prisma.rule.findMany({
            include: {
                learningPath: true,
            },
            orderBy: { priority: "asc" },
        });
        return NextResponse.json(rules, { status: 200 });
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
        const { learningPathId, conditions, priority } = await request.json();
        const newRule = await prisma.rule.create({
            data: {
                learningPathId: parseInt(learningPathId),
                conditions, // JSON array of conditions
                priority: priority ? parseInt(priority) : 0,
            },
            include: {
                learningPath: true,
            },
        });
        return NextResponse.json(newRule, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
