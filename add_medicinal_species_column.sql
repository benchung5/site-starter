-- Add medicinal_species column to trees table
-- Run this in phpMyAdmin or MySQL before using the new field.

ALTER TABLE trees ADD COLUMN medicinal_species TEXT NULL AFTER chinese_medicine;
