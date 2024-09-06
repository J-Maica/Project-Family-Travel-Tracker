# Family Travel tracking

## Overview
- The Family Travel Tracker is a web application that allows users to track countries visited by their family members. Users can add new family members and record the countries they have visited, with each member represented by a color.
  
## Features
- **Travel Tracking:** Add countries visited by family members and view the total number of countries visited.
- ** Color Indicator:** Each family member is associated with a unique color for easy identification.
- **Add New User:** Add new family members with a unique name and color.
- **User Management:** Switch between different family members to view their travel history.
  

## Technologies:
- Backend:
  - Express.js
  - pg (node-postgres) - PostgreSQL client for Node.js.
- Database:
  - PostgreSQL 
- Frontend:
  - EJS - HTML with embedded JavaScript.
  - CSS
- Other:
  - body-parser - Middleware to parse incoming request bodies.

## Installation:
1. git clone https://github.com/yourusername/family-travel-tracker.git
2. Navigate to the project directory
3. Install dependencies: npm i
4. Create the necessary tables (users, visited_countries, countries) in your Postgres database. You can use SQL scripts provided or write your own based on the schema.
5. Set up the PostgreSQL database:
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "your_db",
  password: "your_password",
  port: 5432,
});
6. Start the server: install/use npm nodemon (nodemon index.js)
7. Open your browser and navigate to http://localhost:3000.
   
## Preview 
![Screenshot 2024-09-07 063206](https://github.com/user-attachments/assets/f52811ed-6391-425b-ad83-55e7cec9323a)
![Screenshot 2024-09-07 063216](https://github.com/user-attachments/assets/4acd892d-5bf8-43a3-a685-3acee5d2a4b8)
![Screenshot 2024-09-07 063231](https://github.com/user-attachments/assets/026d946f-bbb3-4212-98b6-5377b25b9cb2)
![Screenshot 2024-09-07 063239](https://github.com/user-attachments/assets/8d368228-323a-4561-b34b-7a9858d89436)



This project is for educational purposes and is based on content from the Udemy course "The Complete 2024 Web Development Bootcamp.
