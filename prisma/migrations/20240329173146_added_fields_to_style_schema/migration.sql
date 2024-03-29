/*
  Warnings:

  - You are about to drop the column `name` on the `Style` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[label,userId]` on the table `Style` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `label` to the `Style` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Style_name_userId_key";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "thumbnail" TEXT;

-- AlterTable
ALTER TABLE "Style" DROP COLUMN "name",
ADD COLUMN     "color" TEXT,
ADD COLUMN     "family" TEXT,
ADD COLUMN     "imagePrompt" TEXT[],
ADD COLUMN     "isDefault" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "label" TEXT NOT NULL,
ADD COLUMN     "llmPrompt" TEXT,
ADD COLUMN     "negativePrompt" TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "Style_label_userId_key" ON "Style"("label", "userId");
