# Payroll System

A web-based payroll management system built with Node.js and MongoDB.

## Project Structure
```
payroll-system/
├── backend/              # Node.js server
│   ├── config/          # Configuration files
│   ├── controllers/     # Request handlers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   └── utils/          # Helper functions
├── frontend/            # Web interface
│   ├── pages/          # HTML pages
│   ├── scripts/        # JavaScript files
│   └── styles/         # CSS files
└── GoogleAppScriptProject/  # Google Apps Script backend
    └── src/            # Script files
```

## Tech Stack
- Backend: Node.js, Express, MongoDB
- Frontend: HTML5, CSS3, JavaScript
- Alternative Backend: Google Apps Script
- Database: MongoDB / Google Sheets

## Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/NJOY0001/payroll-system.git
cd payroll-system
```

2. Install dependencies
```bash
cd backend
npm install
```

3. Configure environment
```bash
cp .env.example .env
# Update .env with your settings
```

4. Start development server
```bash
npm run dev
```

## Testing
```bash
# Test database connection
node test-db.js

# Test server
node test-server.js
```

## Features
- Employee Management
- Payroll Processing
- MongoDB Integration
- RESTful API
- Google Sheets Integration (alternative)