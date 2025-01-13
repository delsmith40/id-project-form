# Database Setup Instructions

1. Install MySQL Server if not already installed
2. Create the database:
   ```sql
   CREATE DATABASE covington_db;
   ```
3. Import the schema:
   ```bash
   mysql -u [username] -p covington_db < schema.sql
   ```
4. Set up proper database user and permissions:
   ```sql
   CREATE USER 'covington_user'@'localhost' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON covington_db.* TO 'covington_user'@'localhost';
   FLUSH PRIVILEGES;
   ```
5. Update config.js with your database credentials

Note: Replace [username] and 'your_password' with actual credentials.