-- CreateEnum
CREATE TYPE "ProcessingJobStatus" AS ENUM ('queued', 'processing', 'succeeded', 'failed');

-- CreateEnum
CREATE TYPE "ProcessingJobType" AS ENUM ('generate_report');

-- CreateTable
CREATE TABLE "processing_jobs" (
    "id" SERIAL NOT NULL,
    "file_id" UUID NOT NULL,
    "status" "ProcessingJobStatus" NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "error" TEXT,
    "type" "ProcessingJobType" NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "processing_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "processing_jobs_file_id_idx" ON "processing_jobs"("file_id");

-- CreateIndex
CREATE INDEX "processing_jobs_status_idx" ON "processing_jobs"("status");

-- CreateIndex
CREATE INDEX "processing_jobs_created_at_idx" ON "processing_jobs"("created_at");

-- AddForeignKey
ALTER TABLE "processing_jobs" ADD CONSTRAINT "processing_jobs_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE CASCADE;
