/*
  Warnings:

  - Added the required column `createdById` to the `Pizza` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- ALTER TABLE "Pizza" ADD COLUMN     "createdById" TEXT NOT NULL;

ALTER TABLE "Pizza" ADD COLUMN "createdById" TEXT;
UPDATE "Pizza" SET "createdById" = 'e708b770-1b5d-4f4b-bee8-bfce3a3027af' WHERE "createdById" IS NULL;
ALTER TABLE "Pizza" ALTER COLUMN "createdById" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Pizza" ADD CONSTRAINT "Pizza_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
