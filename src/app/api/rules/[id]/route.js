import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
    const { id } = params;

    try {
        const rule = await prisma.rule.findUnique({
            where: { id: parseInt(id) },
            include: {
                learningPath: true,
            },
        });

        if (!rule) {
            return NextResponse.json(
                { message: "Rule not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(rule, { status: 200 });
    } catch (error) {
        console.error("Error fetching rule:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function PUT(request, { params }) {
    const { id } = params;

    try {
        const { learningPathId, conditions, priority } = await request.json();

        const rule = await prisma.rule.update({
            where: { id: parseInt(id) },
            data: {
                learningPathId: parseInt(learningPathId),
                conditions,
                priority: priority ? parseInt(priority) : 0,
            },
            include: {
                learningPath: true,
            },
        });
        return NextResponse.json(rule, { status: 200 });
    } catch (error) {
        console.error("Error updating rule:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    const { id } = params;

    try {
        await prisma.rule.delete({
            where: { id: parseInt(id) },
        });
        return NextResponse.json(
            { message: "Rule deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting rule:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function OPTIONS(request) {
    return NextResponse.json(
        { message: "Allowed methods: GET, PUT, DELETE" },
        { status: 200, headers: { Allow: "GET, PUT, DELETE" } }
    );
}
