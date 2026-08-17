-- WARNING: This removes all registered users, donations, and relief requests.
-- District names remain. Restart the backend afterwards to recreate the admin account.
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE relief_requests;
TRUNCATE TABLE donations;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;
