-- CreateTable
CREATE TABLE "AccessKey" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "rateLimit" INTEGER NOT NULL,
    "ttl" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AccessKey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccessKey_key_key" ON "AccessKey"("key");
