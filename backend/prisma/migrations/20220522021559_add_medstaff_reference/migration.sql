-- AlterTable
ALTER TABLE "appointments" ADD COLUMN     "note" TEXT;

-- AlterTable
ALTER TABLE "hospital_bills" ADD COLUMN     "deadlineDate" TIMESTAMP(3),
ADD COLUMN     "med_staff_id" INTEGER;

-- AlterTable
ALTER TABLE "medical_records" ADD COLUMN     "med_staff_id" INTEGER;

-- AddForeignKey
ALTER TABLE "hospital_bills" ADD CONSTRAINT "hospital_bills_med_staff_id_fkey" FOREIGN KEY ("med_staff_id") REFERENCES "medical_staffs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical_records" ADD CONSTRAINT "medical_records_med_staff_id_fkey" FOREIGN KEY ("med_staff_id") REFERENCES "medical_staffs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
