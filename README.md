# Project Name : AirBnB

## **Description**

Your project is a full-stack web application designed for listing and reviewing properties, similar to a simplified Airbnb. It leverages the **MERN stack** (MongoDB, Express, React, Node.js) to provide a seamless experience for users to find, explore, and review different types of listings.

The application includes:

- User authentication
- CRUD functionality for listings
- A mapping feature to display property locations using the MapTiler API

---

## **Features**

- **User Authentication**: Secure signup and login functionality.
- **Listing Management**: Users can create, view, update, and delete their own listings.
- **Reviews**: Users can submit reviews and ratings for listings.
- **Interactive Maps**: Each listing page features an interactive map displaying the property’s precise location.
- **Location Data Handling**: The application uses the **MapTiler Geocoding API** to convert user-provided addresses into geographical coordinates, which are then stored in the backend database.
- **Responsive Design**: The user interface is designed to be responsive and work across various devices.

---

## **Technologies Used**

### **Frontend**

- **React.js**: The core library for building the user interface.
- **React Router**: For client-side routing.
- **Redux Toolkit**: For state management.
- **Axios**: For making API requests to the backend.
- **Tailwind CSS**: For styling and responsive design.
- **MapTiler SDK**: For rendering interactive maps and markers.
- **MapTiler Geocoding API Client**: Used on the frontend to get coordinates from addresses.

### **Backend**

- **Node.js & Express.js**: For the server and API.
- **MongoDB**: The NoSQL database for storing listings, users, and reviews.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB.
- **Passport.js**: For authentication.

---

## **Data Flow: Geocoding & Maps**

The application handles geocoding and map data in an efficient, distributed manner:

1. **Frontend Geocoding**: When a user creates a new listing, the application uses the **MapTiler Geocoding API** directly on the frontend to convert the provided address (e.g., "Paris, France") into geographical coordinates ([longitude, latitude]).

2. **Saving to Backend**: The frontend sends these coordinates, along with all other listing information, to the backend server.

3. **Database Storage**: The backend stores the coordinates as a geometry object within the listing document in the MongoDB database.

4. **Displaying the Map**: When a user views a listing, the frontend fetches the pre-stored geometry data from the backend. The coordinates are then passed directly to the Map component, allowing it to render the map instantly and place a marker at the correct location without needing to perform a new geocoding request.

---

## **Getting Started**

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### **Prerequisites**

- **Node.js**
- **MongoDB** (local)
- **NPM**
- **MapTiler API Key**

---

### **Installation**

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/gunasaikumar3/AirBnB.git
    cd AirBnB
    ```

2.  **Install backend dependencies:**

    ```bash
    cd server
    npm install
    ```

3.  **Install frontend dependencies:**

    ```bash
    cd ../client
    npm install
    ```

4.  **Set up environment variables:**

Create a .env file in the server directory and client directory add your environment variables, including:

Code snippet
in client directory
        
    VITE_MAP_TILER_KEY=your_api_key        

in server directory

    ACCESS_TOKEN_SECRET=helloworld
    REFRESH_TOKEN_SECRET = helloworld
    ACCESS_TOKEN_EXP = 10m
    REFRESH_TOKEN_EXP = 30d
    NODE_ENV=development

Usage
Running the Backend

In the server directory, start the server with nodemon for development:

    nodemon app.js

Running the Frontend

In the client directory, start the React application:

    npm run dev

The application will be accessible at http://localhost:5173.
