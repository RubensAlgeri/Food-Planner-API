-- CreateEnum
CREATE TYPE "ObjectiveType" AS ENUM ('gain', 'lose', 'maintain');

-- CreateEnum
CREATE TYPE "GenderType" AS ENUM ('m', 'f');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usersData" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "Gender" "GenderType" NOT NULL,
    "Age" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "activityFactor" INTEGER NOT NULL,
    "objective" "ObjectiveType" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usersData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meals" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "carb" INTEGER NOT NULL,
    "protein" INTEGER NOT NULL,
    "fat" INTEGER NOT NULL,
    "calories" INTEGER NOT NULL,

    CONSTRAINT "meals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "meals_name_key" ON "meals"("name");

-- CreateIndex
CREATE UNIQUE INDEX "meals_name_userId_key" ON "meals"("name", "userId");

-- AddForeignKey
ALTER TABLE "usersData" ADD CONSTRAINT "usersData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
