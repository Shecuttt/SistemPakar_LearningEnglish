import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(request, { params }) {
    const { id } = params;

    try {
        const { code, name, description, level } = await request.json();
        const learningPath = await prisma.learningPath.update({
            where: { id: parseInt(id) },
            data: {
                code,
                name,
                description,
                level,
            },
        });
        return NextResponse.json(learningPath, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    const { id } = params;

    try {
        await prisma.learningPath.delete({
            where: { id: parseInt(id) },
        });
        return NextResponse.json(
            { message: "Learning path deleted" },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
