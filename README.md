# Payroll System

A web-based payroll management system built with Node.js and MongoDB.

## Prerequisites

- Node.js v16 or higher
- MongoDB v4.4 or higher
- Git

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/payroll-system.git
cd payroll-system
```

2. Install dependencies
```bash
cd backend
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
```
Update the `.env` file with your MongoDB connection string and other settings.

4. Start the server
```bash
npm run dev
```

## Testing

Run the database connection test:
```bash
node test-db.js
```

## Features

- Employee Management
- Payroll Processing
- MongoDB Integration
- RESTful API