import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const session = await prisma.session.create({
            data: {
                status: "ONGOING",
                currentQuestionIndex: 0,
                answers: {},
            },
        });
        const firstQuestion = await prisma.question.findFirst({
            orderBy: { orderNumber: "asc" },
        });
        return res.status(200).json({
            sessionId: session.id,
            currentQuestion: firstQuestion,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
