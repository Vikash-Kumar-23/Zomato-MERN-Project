# Zomato MERN Project

A full-stack food delivery application built using the MERN stack (MongoDB, Express, React, Node.js).

## Project Overview

This project is a Zomato-like food delivery platform with separate interfaces for users and food partners. The application allows:

- **Users**: Browse food items, place orders, and track delivery
- **Food Partners**: Upload food items with videos, manage their menu, and handle orders

## Tech Stack

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT Authentication
- Multer for file uploads
- Storage service for video uploads

### Frontend
- React with Vite
- Modern UI components
- State management

## Project Structure

```
├── backend/             # Node.js Express backend
│   ├── server.js        # Entry point
│   └── src/             # Source code
│       ├── app.js       # Express app configuration
│       ├── controllers/ # Request handlers
│       ├── db/          # Database connection
│       ├── middlewares/ # Custom middlewares
│       ├── models/      # Mongoose models
│       ├── routes/      # API routes
│       └── services/    # External services
│
└── frontend/            # React frontend
    ├── public/          # Static files
    └── src/             # Source code
        ├── App.jsx      # Main component
        ├── assets/      # Images, fonts, etc.
        └── components/  # React components
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Running the Backend
1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npx nodemon server.js
   ```

### Running the Frontend
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login for users
- `GET /api/food` - Get all food items (requires user authentication)
- `POST /api/food` - Create a new food item (requires food partner authentication)

## Authentication

The application uses JWT-based authentication with separate tokens for users and food partners.