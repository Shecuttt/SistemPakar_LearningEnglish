/*
  Warnings:

  - You are about to drop the `Answers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LearningRecommendations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecommendationRules` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Recommendations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RecommendationLearning` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[question_code]` on the table `Question` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "RecommendationRules" DROP CONSTRAINT "RecommendationRules_id_fkey";

-- DropForeignKey
ALTER TABLE "Recommendations" DROP CONSTRAINT "Recommendations_userId_fkey";

-- DropForeignKey
ALTER TABLE "_RecommendationLearning" DROP CONSTRAINT "_RecommendationLearning_A_fkey";

-- DropForeignKey
ALTER TABLE "_RecommendationLearning" DROP CONSTRAINT "_RecommendationLearning_B_fkey";

-- DropIndex
DROP INDEX "Session_userId_key";

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "resultId" INTEGER;

-- DropTable
DROP TABLE "Answers";

-- DropTable
DROP TABLE "LearningRecommendations";

-- DropTable
DROP TABLE "RecommendationRules";

-- DropTable
DROP TABLE "Recommendations";

-- DropTable
DROP TABLE "_RecommendationLearning";

-- CreateTable
CREATE TABLE "Answer" (
    "id" SERIAL NOT NULL,
    "isYes" BOOLEAN NOT NULL,
    "questionId" INTEGER NOT NULL,
    "sessionId" INTEGER NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LearningPath" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "level" TEXT NOT NULL,

    CONSTRAINT "LearningPath_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rule" (
    "id" SERIAL NOT NULL,
    "learningPathId" INTEGER NOT NULL,
    "conditions" JSONB NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Rule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Answer_questionId_sessionId_idx" ON "Answer"("questionId", "sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "LearningPath_code_key" ON "LearningPath"("code");

-- CreateIndex
CREATE INDEX "Rule_learningPathId_idx" ON "Rule"("learningPathId");

-- CreateIndex
CREATE UNIQUE INDEX "Question_question_code_key" ON "Question"("question_code");

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "LearningPath"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rule" ADD CONSTRAINT "Rule_learningPathId_fkey" FOREIGN KEY ("learningPathId") REFERENCES "LearningPath"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
