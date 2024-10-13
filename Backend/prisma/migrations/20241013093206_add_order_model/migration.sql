-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "userEmail" TEXT NOT NULL,
    "fishId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_fishId_fkey" FOREIGN KEY ("fishId") REFERENCES "FishDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
