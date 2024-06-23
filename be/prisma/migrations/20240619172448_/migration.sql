/*
  Warnings:

  - A unique constraint covering the columns `[roomId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roomId` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `account` ADD COLUMN `roomId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Account_roomId_key` ON `Account`(`roomId`);

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
