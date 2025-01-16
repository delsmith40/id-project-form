-- Check if tables exist before creating them
-- This prevents errors if tables already exist in customer's database

-- Projects table
CREATE TABLE IF NOT EXISTS `projects` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `customer_id` VARCHAR(50),  -- Add customer-specific identifier
  `external_ref` VARCHAR(100) -- Add external reference for customer system
);

-- Phases table
CREATE TABLE IF NOT EXISTS `phases` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `project_id` INT,
  `phase_name` ENUM('analyze', 'design', 'develop', 'implement', 'evaluate', 'document') NOT NULL,
  `status` ENUM('not_started', 'in_progress', 'completed') DEFAULT 'not_started',
  `completion_percentage` INT DEFAULT 0,
  `customer_phase_id` VARCHAR(50), -- Add customer-specific phase identifier
  FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE
);

-- Questions table
CREATE TABLE IF NOT EXISTS `questions` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `phase_id` INT,
  `question_text` TEXT NOT NULL,
  `answer` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `customer_question_id` VARCHAR(50), -- Add customer-specific question identifier
  FOREIGN KEY (`phase_id`) REFERENCES `phases`(`id`) ON DELETE CASCADE
);

-- Documents table
CREATE TABLE IF NOT EXISTS `documents` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `project_id` INT,
  `phase_id` INT,
  `title` VARCHAR(255) NOT NULL,
  `content` TEXT,
  `file_path` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `customer_doc_id` VARCHAR(50), -- Add customer-specific document identifier
  FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`phase_id`) REFERENCES `phases`(`id`) ON DELETE CASCADE
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_project_customer ON projects(customer_id);
CREATE INDEX IF NOT EXISTS idx_phase_customer ON phases(customer_phase_id);
CREATE INDEX IF NOT EXISTS idx_question_customer ON questions(customer_question_id);
CREATE INDEX IF NOT EXISTS idx_document_customer ON documents(customer_doc_id);