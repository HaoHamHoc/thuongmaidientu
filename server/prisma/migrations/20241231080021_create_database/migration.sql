-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "hasspassword" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "isActive" BOOLEAN DEFAULT false,
    "codeActive" TEXT,
    "expiredCode" TIMESTAMP(3),
    "expiredCodeChangePassword" TIMESTAMP(3),
    "codeChangePassword" TEXT,
    "expiredChangePassword" TIMESTAMP(3),
    "timePassword" INTEGER DEFAULT 5,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
