/*
  Warnings:

  - Added the required column `complete` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "complete" BOOLEAN NOT NULL,
ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
