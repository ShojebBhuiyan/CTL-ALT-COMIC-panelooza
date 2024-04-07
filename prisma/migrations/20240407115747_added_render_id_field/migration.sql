/*
  Warnings:

  - Added the required column `renderId` to the `RenderedScene` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RenderedScene" ADD COLUMN     "renderId" TEXT NOT NULL;
