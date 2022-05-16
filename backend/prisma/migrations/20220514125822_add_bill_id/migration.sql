-- AlterTable
ALTER TABLE "appointments" ADD COLUMN     "hospital_bill_id" INTEGER;

-- AlterTable
ALTER TABLE "hospital_bills" ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;
