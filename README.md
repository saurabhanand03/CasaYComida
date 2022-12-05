# Casa Y Comida

Casa Y Comida is a free full-stack web application for disadvantaged people who need easy-to-access resources to help them locate nearby shelters, food banks, and libraries based off of their location in the United States. It is built with the MERN Stack (MongoDB, Express, React, Node.js) and uses the Google Maps API and the Google Places API.

*Created by Amay Patel, Saurabh Anand, Rohan Chander, and Alejandro Santana for CEN3031 - Introduction to Software Engineering*

## Installation

1. Check to see if you have node installed on your computer by running the command `node -v` in a terminal. If you do not have node installed, you can download it [here](https://nodejs.org/en/download/).
2. Clone the repository with the command `git clone` or by downloading a zip file.
3. Navigate to the client directory of the project and run the command `npm install` to install all of the dependencies.
4. Navigate to the server directory of the project and create a file called `.env`.
    - In the `.env` file, add the following lines:
        - `MONGODB_URL=mongodb+srv://BOT0001:OurFirstUserxD@cluster0.d9e5gyp.mongodb.net/CEN3031Project?retryWrites=true&w=majority`
        - `ACCESS_TOKEN_SECRET=<your access token secret>`*
        - `REFRESH_TOKEN_SECRET=<your refresh token secret>`*

5. Run the command `npm install` to install all of the dependencies.
6. Run the command `npm start` to start the server.
7. Navigate to the client directory of the project and run the command `npm start` to start the client.

*\*To generate a random string for the access token secret and refresh token secret, run the following command in a node terminal: `require('crypto').randomBytes(64).toString('hex')`*
*Copy the output of the command and paste it into the `.env` file.*
