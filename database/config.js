// Database configuration
const config = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'your_username',
  password: process.env.DB_PASSWORD || 'your_password',
  database: process.env.DB_NAME || 'your_database_name',
  port: process.env.DB_PORT || 3306,
  // Add any additional customer-specific configuration here
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
  // Add SSL configuration if required
  ssl: process.env.DB_SSL === 'true' ? {
    rejectUnauthorized: false
  } : false
};

module.exports = config;