/*
  Warnings:

  - You are about to drop the `_OrderToPizza` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `pizzaId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_OrderToPizza" DROP CONSTRAINT "_OrderToPizza_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderToPizza" DROP CONSTRAINT "_OrderToPizza_B_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "pizzaId" TEXT NOT NULL,
ADD COLUMN     "toppings" TEXT[];

-- DropTable
DROP TABLE "_OrderToPizza";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "Pizza"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
