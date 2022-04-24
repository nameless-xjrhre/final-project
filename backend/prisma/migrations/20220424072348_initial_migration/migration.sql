-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "BillStatus" AS ENUM ('PAID', 'UNPAID');

-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "VisitType" AS ENUM ('ROUTINE', 'FOLLOWUP', 'URGENT');

-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('PENDING', 'CANCELED', 'EXPIRED', 'DONE');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "user_type" "UserType" NOT NULL DEFAULT E'USER',
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patients" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "sex" "Sex" NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "contact_num" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hospital_bills" (
    "id" SERIAL NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" "BillStatus" NOT NULL DEFAULT E'UNPAID',

    CONSTRAINT "hospital_bills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical_records" (
    "id" SERIAL NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "diagnosis" TEXT NOT NULL,
    "prescription" TEXT NOT NULL,

    CONSTRAINT "medical_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointments" (
    "id" SERIAL NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "med_staff_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "visit_type" "VisitType" NOT NULL,
    "status" "AppointmentStatus" NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical_staffs" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "contact_num" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "medical_staffs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedules" (
    "id" SERIAL NOT NULL,
    "med_staff_id" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schedules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "hospital_bills" ADD CONSTRAINT "hospital_bills_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medical_records" ADD CONSTRAINT "medical_records_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_med_staff_id_fkey" FOREIGN KEY ("med_staff_id") REFERENCES "medical_staffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_med_staff_id_fkey" FOREIGN KEY ("med_staff_id") REFERENCES "medical_staffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
