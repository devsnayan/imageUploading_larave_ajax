
# Item Management System

## Table of Contents
- [About](#about)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Developer](#developer)

## About
The Item Management System is a web application built with Laravel that allows users to manage items. Users can add, edit, and delete items, as well as upload images for each item. The application showcases the use of Laravel's MVC architecture, RESTful APIs, and Dropzone.js for image uploads.

## Features
- Add new items with images
- Edit existing items
- Delete items
- View all items in a card layout
- Validation and error handling
- Responsive design

## Requirements
- PHP 8.0 or higher
- Composer
- Laravel 8.x or higher
- MySQL

## Installation

### Clone the Repository
\`\`\`bash
git clone https://github.com/yourusername/item-management-system.git
cd item-management-system
\`\`\`

### Install Dependencies
#### Composer
\`\`\`bash
composer install
\`\`\`
#### npm
\`\`\`bash
npm install
\`\`\`

### Environment Setup
1. Copy the \`.env.example\` file to \`.env\`
\`\`\`bash
cp .env.example .env
\`\`\`
2. Generate the application key
\`\`\`bash
php artisan key:generate
\`\`\`
3. Configure your database in the \`.env\` file:
\`\`\`dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
\`\`\`

### Run Migrations and Seeders
\`\`\`bash
php artisan migrate --seed
\`\`\`

### Storage Link
Create a symbolic link from \`public/storage\` to \`storage/app/public\`:
\`\`\`bash
php artisan storage:link
\`\`\`

### Compile Assets
\`\`\`bash
npm run dev
\`\`\`

## Usage

### Start the Development Server
\`\`\`bash
php artisan serve
\`\`\`

Visit [http://localhost:8000](http://localhost:8000) in your web browser to see the application.

## Developer
Name: Mohammad Nayan
Contact: contact@nayan.pro

