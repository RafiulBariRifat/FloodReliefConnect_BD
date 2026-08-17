-- Run this once in phpMyAdmin if you already imported schema.sql before.
ALTER TABLE users ADD COLUMN profile_image LONGTEXT NULL AFTER nid_number;
