/*
  Warnings:

  - Added the required column `isExpired` to the `TemporyResident` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `temporyresident` ADD COLUMN `isExpired` BOOLEAN NOT NULL;
