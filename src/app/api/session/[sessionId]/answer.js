// pages/api/session/[sessionId]/answer.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { sessionId } = req.query;
    const { questionCode, answer } = req.body;

    try {
        const session = await prisma.session.findUnique({
            where: { id: sessionId },
        });

        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        // Update jawaban dan index pertanyaan
        const updatedAnswers = { ...session.answers, [questionCode]: answer };
        const updatedSession = await prisma.session.update({
            where: { id: sessionId },
            data: {
                answers: updatedAnswers,
                currentQuestionIndex: session.currentQuestionIndex + 1,
            },
        });

        return res.status(200).json({
            message: "Answer saved",
            currentQuestionIndex: updatedSession.currentQuestionIndex,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
