-- CreateTable
CREATE TABLE "FishDetails" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "FishDetails_pkey" PRIMARY KEY ("id")
);
