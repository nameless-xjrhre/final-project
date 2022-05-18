-- CreateEnum
CREATE TYPE "ScheduleStatus" AS ENUM ('CLOSED', 'OPEN', 'DONE', 'NOT_AVAILABLE');

-- AlterTable
ALTER TABLE "schedules" ADD COLUMN     "scheduleStatus" "ScheduleStatus" NOT NULL DEFAULT E'OPEN';
