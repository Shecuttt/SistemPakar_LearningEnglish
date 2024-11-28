import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { sessionId } = req.query;

    try {
        const session = await prisma.session.findUnique({
            where: {
                id: sessionId,
            },
        });
        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        const question = await prisma.question.findMany({
            orderBy: {
                orderNumber: "asc",
            },
        });

        if (session.currentQuestionIndex >= question.length) {
            return res.status(200).json({
                completed: true,
                message: "All question answered",
            });
        }

        const nextQuestion = question[session.currentQuestionIndex];
        return res.status(200).json({
            question: nextQuestion,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server error" });
    }
}
