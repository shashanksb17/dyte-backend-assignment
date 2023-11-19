# Log Ingestor and Query Interface Documentation

## Clone and Setup

To get started with the Log Ingestor and Query Interface, follow these steps to clone the repository and set up the application on your local machine.

### Prerequisites

Ensure that you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Clone the Repository

Open a terminal or command prompt and run the following command to clone the repository:

```bash
git clone https://github.com/dyte-submissions/november-2023-hiring-shashanksb17
```

### Navigate to the Project Directory

Change into the project directory using the following command:

```bash
cd backend-assignment
```

### Install Dependencies

Install the required npm packages by running the following command:

```bash
npm install
```

## Table of Contents

1. [Introduction](#introduction)
2. [Folder Structure](#folder-structure)
3. [Dependencies](#dependencies)
4. [Environment Variables](#environment-variables)
5. [Database Configuration](#database-configuration)
6. [Authentication and Authorization](#authentication-and-authorization)
7. [Endpoints](#endpoints)
   - [Log Ingestion](#log-ingestion)
   - [Log Query](#log-query)
   - [User Registration](#user-registration)
   - [User Login](#user-login)
8. [MongoDB Text Search](#mongodb-text-search)
9. [API Table](#api-table)
10. [Run the Application](#run-the-application)

## Introduction

This Node.js application serves as a Log Ingestor and Query Interface. It provides endpoints for ingesting log data and querying logs based on various filters. Additionally, it includes user registration and login functionality with role-based access control.

## Folder Structure

```
|-- src
|   |-- dbConfig
|   |   |-- dbConnection.js
|   |-- middleware
|   |   |-- authMiddleware.js
|   |   |-- rbacMiddleware.js
|   |-- models
|   |   |-- logModel.js
|   |   |-- userModel.js
|   |-- routes
|   |   |-- logRoutes.js
|   |   |-- userRoutes.js
|-- index.js
|-- .env
```

## Dependencies

- `express`: Web framework for building APIs
- `mongoose`: MongoDB object modeling tool
- `jsonwebtoken`: JSON Web Token generation and verification
- `bcrypt`: Password hashing library

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL=your_mongodb_connection_string
SECRET=your_secret_key
PORT=3000
```

## Database Configuration

The application uses MongoDB as its database. The `dbConnection.js` file in `src/dbConfig` handles the database connection.

## Authentication and Authorization

- **Authentication Middleware (`authMiddleware.js`):**
  - Verifies the presence and validity of a JSON Web Token (JWT) in the request header.

- **Role-Based Access Control Middleware (`rbacMiddleware.js`):**
  - Enforces access control based on user roles.

## Endpoints

### Log Ingestion

- **Endpoint:** `POST /logs`
- **Authentication:** Requires a valid JWT.
- **Authorization:** None (all authenticated users can ingest logs).
- **Request Body Format:**
  ```json
  {
    "level": "error",
    "message": "Failed to connect to DB",
    "resourceId": "server-1234",
    "timestamp": "2023-09-15T08:00:00Z",
    "traceId": "abc-xyz-123",
    "spanId": "span-456",
    "commit": "5e5342f",
    "metadata": {
        "parentResourceId": "server-0987"
    }
  }
  ```

### Log Query

- **Endpoint:** `GET /logs`
- **Authentication:** Requires a valid JWT.
- **Authorization:** Requires 'admin' role.
- **Query Parameters:**
  - `search`: Full-text search term.
  - Additional filters: `level`, `message`, `resourceId`, `timestamp`, `traceId`, `spanId`, `commit`, `metadata.parentResourceId`.

### User Registration

- **Endpoint:** `POST /users/register`
- **Authentication:** None
- **Authorization:** None
- **Request Body Format:**
  ```json
  {
    "username": "user123",
    "password": "password123",
    "role": "user"
  }
  ```

### User Login

- **Endpoint:** `POST /users/login`
- **Authentication:** None
- **Authorization:** None
- **Request Body Format:**
  ```json
  {
    "username": "user123",
    "password": "password123"
  }
  ```

## MongoDB Text Search

The application optimizes log queries using MongoDB's text search feature. The `$text` operator is employed to efficiently search for logs based on the specified fields.

### Text Search Query Parameters

- **`$text` Operator:** The `$text` operator performs a text search on the specified fields, allowing for full-text search capabilities.

### Example Text Search Query

To search for logs containing the term "error," the query would be as follows:

```json
GET /logs?search=error
```

This query utilizes the `$text` operator to efficiently search for logs with the term "error" in the `level` or `message` fields.

## API Table

| Endpoint                    | Method | Authentication | Authorization | Description                                           |
| --------------------------- | ------ | --------------- | -------------- | ----------------------------------------------------- |
| `/logs`                     | POST   | Required        | None           | Ingests log data.                                     |
| `/logs`                     | GET    | Required        | Admin          | Queries logs based on various filters.                |
| `/users/register`           | POST   | None            | None           | Registers a new user.                                 |
| `/users/login`              | POST   | None            | None           | Logs in a user, providing a JWT for authentication.   |

## Run the Application

1. Install dependencies: `npm install`
2. Start the application: `npm start`
3. Access the API at `http://localhost:3000`
