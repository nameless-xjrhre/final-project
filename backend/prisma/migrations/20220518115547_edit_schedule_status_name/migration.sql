/*
  Warnings:

  - You are about to drop the column `scheduleStatus` on the `schedules` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "scheduleStatus",
ADD COLUMN     "status" "ScheduleStatus" NOT NULL DEFAULT E'OPEN';
