CREATE DATABASE IF NOT EXISTS reliefconnect_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE reliefconnect_db;

CREATE TABLE IF NOT EXISTS users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone_number VARCHAR(20) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  nid_number VARCHAR(30) UNIQUE,
  profile_image LONGTEXT NULL,
  role ENUM('user','admin') NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS password_reset_tokens (
  user_id INT PRIMARY KEY,
  code_hash VARCHAR(255) NOT NULL,
  expires_at DATETIME NOT NULL,
  attempts TINYINT UNSIGNED NOT NULL DEFAULT 0,
  CONSTRAINT fk_reset_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS districts (
  district_id INT AUTO_INCREMENT PRIMARY KEY,
  district_name VARCHAR(50) NOT NULL UNIQUE,
  is_active TINYINT(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB;

INSERT INTO districts (district_name) VALUES
('Bandarban'), ('Chattogram'), ('Rangamati'), ('Thanchi'), ('Teknaf'), ('Feni'), ("Cox''s Bazar"), ('Khagrachari')
ON DUPLICATE KEY UPDATE district_name=VALUES(district_name);

CREATE TABLE IF NOT EXISTS donations (
  donation_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  district_id INT NULL,
  amount DECIMAL(12,2) NOT NULL,
  payment_method ENUM('bKash','Nagad','Rocket','Bank Transfer') NOT NULL,
  transaction_id VARCHAR(100) NOT NULL UNIQUE,
  payment_status ENUM('completed','pending','failed') NOT NULL DEFAULT 'completed',
  donated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT donation_amount CHECK (amount > 0),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (district_id) REFERENCES districts(district_id) ON DELETE SET NULL,
  INDEX idx_donation_district (district_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS relief_requests (
  request_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  district_id INT NOT NULL,
  family_members INT NOT NULL,
  vulnerable_count INT NOT NULL DEFAULT 0,
  address_details TEXT NOT NULL,
  urgency_level ENUM('Critical','High','Moderate') NOT NULL DEFAULT 'High',
  requested_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  status ENUM('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  admin_remarks TEXT NULL,
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT family_positive CHECK (family_members > 0),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (district_id) REFERENCES districts(district_id) ON DELETE CASCADE,
  INDEX idx_relief_district_status (district_id, status)
) ENGINE=InnoDB;
