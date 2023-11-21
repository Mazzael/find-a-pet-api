/*
  Warnings:

  - Added the required column `pet_image` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "pet_image" TEXT NOT NULL;
