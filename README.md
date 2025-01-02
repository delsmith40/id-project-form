# Covington Instructional Design Project

## Complete Installation Guide

### Prerequisites

1. Install these required software:
   - [Node.js](https://nodejs.org/) (LTS version recommended)
   - [Git](https://git-scm.com/downloads)
   - A web server like [XAMPP](https://www.apachefriends.org/) (includes Apache, MySQL, and PHP)

### Step-by-Step Installation

#### 1. Database Setup
1. Install XAMPP and start Apache and MySQL services
2. Open phpMyAdmin (http://localhost/phpmyadmin)
3. Create a new database named `covington_db`
4. Import the database schema (will be provided in `database/schema.sql`)

#### 2. Frontend Setup
```bash
# Clone the repository
git clone <your-repository-url>

# Navigate to project directory
cd covington-project

# Install dependencies
npm install

# Build the frontend
npm run build
```

#### 3. Deploy to Your Server

##### Using XAMPP (Windows):
1. Copy the contents of the `dist` folder to:
   - Windows: `C:\xampp\htdocs\covington`
   - Linux: `/opt/lampp/htdocs/covington`
   - Mac: `/Applications/XAMPP/htdocs/covington`

2. Access your site at: `http://localhost/covington`

##### Using Apache directly:
1. Copy the contents of the `dist` folder to your Apache web root
2. Create/modify `.htaccess` file in your web root:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteCond %{REQUEST_FILENAME} !-l
     RewriteRule . /index.html [L]
   </IfModule>
   ```

### Configuration

1. Create a `config.js` file in the `dist` folder:
   ```javascript
   window.APP_CONFIG = {
     apiUrl: 'http://localhost/api',
     databaseName: 'covington_db'
   };
   ```

### Troubleshooting

Common issues and solutions:

1. **Blank Page After Deployment**
   - Check if all files in `dist` folder were copied correctly
   - Verify `.htaccess` file is present and correct
   - Check Apache error logs

2. **Database Connection Issues**
   - Verify MySQL service is running
   - Check database credentials
   - Confirm database name matches configuration

3. **404 Errors**
   - Verify Apache mod_rewrite is enabled
   - Check `.htaccess` file is present
   - Confirm all routes are correctly configured

### Support

If you encounter any issues:
1. Check the browser console for errors (F12 key)
2. Review Apache error logs
3. Verify all services are running in XAMPP
4. Contact system administrator for assistance

### Security Notes

1. Change default database passwords
2. Keep XAMPP and all components updated
3. Configure proper file permissions
4. Enable HTTPS for production use

## Project Information

**URL**: https://lovable.dev/projects/6e38c7bd-1f98-4a91-9635-a9c0bea12019

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/6e38c7bd-1f98-4a91-9635-a9c0bea12019) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/6e38c7bd-1f98-4a91-9635-a9c0bea12019) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
