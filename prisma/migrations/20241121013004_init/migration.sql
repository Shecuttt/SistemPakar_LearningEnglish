-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "question_code" TEXT NOT NULL,
    "question" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);
