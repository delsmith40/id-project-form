-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS `covington_db`;
USE `covington_db`;

-- Projects table
CREATE TABLE IF NOT EXISTS `projects` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Phases table
CREATE TABLE IF NOT EXISTS `phases` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `project_id` INT,
  `phase_name` ENUM('analyze', 'design', 'develop', 'implement', 'evaluate', 'document') NOT NULL,
  `status` ENUM('not_started', 'in_progress', 'completed') DEFAULT 'not_started',
  `completion_percentage` INT DEFAULT 0,
  FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE
);

-- Questions table
CREATE TABLE IF NOT EXISTS `questions` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `phase_id` INT,
  `question_text` TEXT NOT NULL,
  `answer` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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
  FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`phase_id`) REFERENCES `phases`(`id`) ON DELETE CASCADE
);

-- Insert some initial data
INSERT INTO `projects` (`title`, `description`) VALUES 
('Sample Project', 'This is a sample instructional design project');

-- Insert phases for the sample project
INSERT INTO `phases` (`project_id`, `phase_name`, `status`) VALUES 
(1, 'analyze', 'not_started'),
(1, 'design', 'not_started'),
(1, 'develop', 'not_started'),
(1, 'implement', 'not_started'),
(1, 'evaluate', 'not_started'),
(1, 'document', 'not_started');