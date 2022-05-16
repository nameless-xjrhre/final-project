-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_hospital_bill_id_fkey";

-- AlterTable
ALTER TABLE "appointments" ALTER COLUMN "hospital_bill_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_hospital_bill_id_fkey" FOREIGN KEY ("hospital_bill_id") REFERENCES "hospital_bills"("id") ON DELETE SET NULL ON UPDATE CASCADE;
