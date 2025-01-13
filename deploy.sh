#!/bin/bash

# Build the React application
echo "Building React application..."
npm run build

# Create deployment directory
echo "Creating deployment directory..."
mkdir -p deployment

# Copy build files
echo "Copying build files..."
cp -r dist/* deployment/
cp .htaccess deployment/

# Create database backup
echo "Creating database backup..."
mkdir -p deployment/database
cp database/schema.sql deployment/database/

# Create deployment instructions
echo "Creating deployment instructions..."
cat > deployment/README.md << EOL
# Deployment Instructions

## 1. Database Setup
1. Access phpMyAdmin or MySQL command line
2. Create database: \`CREATE DATABASE covington_db;\`
3. Import schema: \`mysql -u [username] -p covington_db < database/schema.sql\`

## 2. Apache Setup
1. Copy all files to your Apache web root directory
2. Ensure mod_rewrite is enabled: \`a2enmod rewrite\`
3. Restart Apache: \`service apache2 restart\`

## 3. Configuration
1. Update config.js with your database credentials
2. Set appropriate file permissions
3. Test the application

For detailed instructions, refer to the main README.md
EOL

# Create config template
echo "Creating config template..."
cat > deployment/config.js << EOL
window.APP_CONFIG = {
  apiUrl: 'http://your-domain.com/api',
  databaseName: 'covington_db',
  // Add other configuration as needed
};
EOL

# Create zip archive
echo "Creating deployment package..."
cd deployment
zip -r ../covington-deployment.zip ./*

echo "Deployment package created: covington-deployment.zip"