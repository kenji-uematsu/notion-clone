# Notion Clone

This project is a clone of the popular task management application, Notion. It is built using React with TypeScript for the frontend and Node.js for the backend.

## Project Structure

The project is divided into two main parts: the client and the server.

### Client

The client is built using React and TypeScript. It includes the following key components:

- **Components**: Reusable UI components such as Editor, Sidebar, and Navbar.
- **Pages**: Different pages of the application including Home, Workspace, and Document.
- **Hooks**: Custom hooks for authentication and managing workspaces and documents.
- **Context**: Context providers for managing global state related to authentication and workspaces.
- **Utils**: Utility functions for API calls and other helper functions.

### Server

The server is built using Node.js and Express. It includes:

- **Controllers**: Handle the business logic for authentication, documents, and workspaces.
- **Models**: Define the data structure for users, documents, and workspaces.
- **Routes**: Define the API endpoints for authentication, documents, and workspaces.
- **Middleware**: Custom middleware for authentication and error handling.
- **Config**: Configuration files for database connection and other settings.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:

   ```
   git clone <repository-url>
   ```

2. Navigate to the client directory and install dependencies:

   ```
   cd client
   npm install
   ```

3. Navigate to the server directory and install dependencies:

   ```
   cd ../server
   npm install
   ```

4. Install MySQL database and create a new database:

   ```sql
   CREATE DATABASE notion_clone;
   CREATE USER 'notion_user'@'localhost' IDENTIFIED BY 'password123';
   GRANT ALL PRIVILEGES ON notion_clone.* TO 'notion_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

5. Set up the database connection in the server/config/database.ts file.

6. Start the server:

   ```
   npm start
   ```

7. In a separate terminal, navigate to the client directory and start the client:
   ```
   cd client
   npm start
   ```

## Setup Environment Variables

Create a `.env` file in the server directory with the following variables:

```
DB_PORT=3306
JWT_SECRET=your_jwt_secret_key
DB_HOST=localhost
DB_USER=notion_user
DB_PASSWORD=password123
DB_NAME=notion_clone
REACT_APP_API_PORT=3001
```

Make sure to replace the values with your actual configuration. Do not commit this file to version control.

## Features

- User authentication (login and signup)
- Create, read, update, and delete documents
- Organize documents into workspaces
- Responsive design for various screen sizes

## Technologies Used

- **Frontend**: React, TypeScript, Axios
- **Backend**: Node.js, Express, TypeScript
- **Database**: MySQL with Sequelize ORM
- **Authentication**: JSON Web Tokens (JWT)
- **Validation**: express-validator
- **Security**: bcrypt for password hashing

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

```

```
