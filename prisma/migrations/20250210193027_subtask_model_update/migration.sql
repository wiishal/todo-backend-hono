-- AlterTable
ALTER TABLE "Subtask" ADD COLUMN     "complete" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "complete" SET DEFAULT false;
