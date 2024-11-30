-- CreateTable
CREATE TABLE "Answers" (
    "id" SERIAL NOT NULL,
    "answer" TEXT NOT NULL,
    "questionId" INTEGER NOT NULL,
    "sessionId" INTEGER NOT NULL,

    CONSTRAINT "Answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "umur" TEXT NOT NULL,
    "kelas" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recommendations" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Recommendations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LearningRecommendations" (
    "id" SERIAL NOT NULL,
    "recommendationCode" TEXT NOT NULL,
    "recommendation" TEXT NOT NULL,

    CONSTRAINT "LearningRecommendations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecommendationRules" (
    "id" SERIAL NOT NULL,
    "rule" TEXT NOT NULL,

    CONSTRAINT "RecommendationRules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RecommendationLearning" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Answers_questionId_key" ON "Answers"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "Answers_sessionId_key" ON "Answers"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_userId_key" ON "Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Recommendations_userId_key" ON "Recommendations"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "LearningRecommendations_recommendationCode_key" ON "LearningRecommendations"("recommendationCode");

-- CreateIndex
CREATE UNIQUE INDEX "_RecommendationLearning_AB_unique" ON "_RecommendationLearning"("A", "B");

-- CreateIndex
CREATE INDEX "_RecommendationLearning_B_index" ON "_RecommendationLearning"("B");

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recommendations" ADD CONSTRAINT "Recommendations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecommendationRules" ADD CONSTRAINT "RecommendationRules_id_fkey" FOREIGN KEY ("id") REFERENCES "Recommendations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecommendationLearning" ADD CONSTRAINT "_RecommendationLearning_A_fkey" FOREIGN KEY ("A") REFERENCES "LearningRecommendations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecommendationLearning" ADD CONSTRAINT "_RecommendationLearning_B_fkey" FOREIGN KEY ("B") REFERENCES "Recommendations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
