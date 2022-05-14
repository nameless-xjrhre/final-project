/*
  Warnings:

  - A unique constraint covering the columns `[hospital_bill_id]` on the table `appointments` will be added. If there are existing duplicate values, this will fail.
  - Made the column `hospital_bill_id` on table `appointments` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "appointments" ALTER COLUMN "hospital_bill_id" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "appointments_hospital_bill_id_key" ON "appointments"("hospital_bill_id");

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_hospital_bill_id_fkey" FOREIGN KEY ("hospital_bill_id") REFERENCES "hospital_bills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
