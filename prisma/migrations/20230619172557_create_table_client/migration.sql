-- CreateEnum
CREATE TYPE "Treats" AS ENUM ('SR', 'SRA', 'DR', 'DRA');

-- CreateTable
CREATE TABLE "client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" VARCHAR(30) NOT NULL,
    "cnpj" VARCHAR(30) NOT NULL,
    "treatment" "Treats" NOT NULL DEFAULT 'SR',
    "resp" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);
