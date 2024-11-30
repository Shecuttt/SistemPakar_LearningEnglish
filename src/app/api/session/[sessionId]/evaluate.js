// pages/api/session/[sessionId]/evaluate.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { sessionId } = req.query;

    try {
        const session = await prisma.session.findUnique({
            where: { id: sessionId },
        });

        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        // Ambil semua rules
        const rules = await prisma.rule.findMany({
            include: {
                learningPath: true,
            },
        });

        // Evaluasi setiap rule
        const matchingPaths = rules.filter((rule) => {
            const conditions = rule.conditions;
            if (conditions.operator === "AND") {
                return conditions.rules.every(
                    (ruleCondition) =>
                        session.answers[ruleCondition.question_code] ===
                        ruleCondition.answer
                );
            }
            return false;
        });

        // Sort berdasarkan priority
        matchingPaths.sort((a, b) => a.priority - b.priority);

        // Update session status
        await prisma.session.update({
            where: { id: sessionId },
            data: {
                status: "COMPLETED",
                recommendedLearningPathId: matchingPaths[0]?.learningPathId,
            },
        });

        return res.status(200).json({
            recommendations: matchingPaths.map((path) => ({
                learningPathId: path.learningPathId,
                code: path.learningPath.code,
                name: path.learningPath.name,
                description: path.learningPath.description,
                level: path.learningPath.level,
            })),
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
