/*
  Warnings:

  - The values [DONG_PER_QUARTER,DONG_PER_kWh,DONG_PER_m3,DONG_PER_PERSON] on the enum `DefaultPrice_unit` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `outDate` to the `MemberOfRoom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `defaultprice` MODIFY `unit` ENUM('đồng/tháng', 'đồng/quý', 'đồng/kWh', 'đồng/khối', 'đồng/người') NOT NULL;

-- AlterTable
ALTER TABLE `memberofroom` ADD COLUMN `outDate` DATETIME(3) NOT NULL;
