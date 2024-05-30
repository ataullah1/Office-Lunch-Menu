# Office Lunch Management System

This is a web application designed to streamline the process of managing lunch orders in an office environment. Employees can place their lunch orders through the website, and the admin can easily view and manage these orders.

## Live Link: https://office-lunch-menu.web.app/

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Project Description

The Office Lunch Management System allows office employees to order their lunch through a web application. The orders are stored in a database, and the admin can access these orders to arrange lunch for the employees efficiently.

## Features

- Employee login and registration
- Place lunch orders
- View order history
- Admin dashboard to manage orders, item Add and Update
- All device fully Responsive design

## Technologies Used

### Frontend

- **React**: JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework
- **React Hook Form**: Performant, flexible and extensible forms with easy-to-use validation
- **React SweetAlert**: A beautiful replacement for JavaScript's alert
- **React Hot Toast**: A beautiful Toast alert
- **Axios**: Promise based HTTP client for the browser and node.js
- **TanStack Query**: Powerful asynchronous state management

### Backend

- **Node.js**: JavaScript runtime for server-side development.
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js
- **MongoDB**: NoSQL database for modern applications

## Project Structure

![Project Structure](./Project%20Structure.png)

## Installation

### Prerequisites

- Node.js

### Project Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/ataullah1/Office-Lunch-Menu-Management.git
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd "Client Side"
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd "Server Side"
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the `backend` directory and add the following variables:

   ```
   DB_USER=<your-mongodb-uri-user>
   DB_PASS=<your-mongodb-uri-password>

   ```

4. Start the Express server:
   ```bash
   nodemon index.js
   ```

## Usage

1. Open your web browser and go to `http://localhost:3000`
2. Register as a new employee or login with existing credentials
3. Place your lunch order from the available options
4. Admin can login to the admin dashboard to view and manage orders

## Example Admin Login

- email: admin1@gmail.com
- password: Admin00

## API Endpoints

### Auth

- **POST** `/api/employee/register`: Register a new user

### Orders

- **GET** `/api/orders`: Get all orders (Admin only)
- **POST** `/api/order`: Place a new order
- **GET** `/api/orderDta/:id`: Get orders for a specific user
- **UPDATE** `/api/order-update`: Update orders (Admin only)
- **DELETE** `/api/my-order-delete/:id`: Delete orders
