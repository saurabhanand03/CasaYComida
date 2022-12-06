# Casa Y Comida

Casa Y Comida is a free full-stack web application for disadvantaged people who need easy-to-access resources to help them locate nearby shelters, food banks, and libraries based off of their location in the United States. It is built with the MERN Stack (MongoDB, Express, React, Node.js) and uses the Google Maps API and the Google Places API.

---

## Set up environment

1. Check to see if you have node installed on your computer by running the command `node -v` in a terminal. If you do not have node installed, you can download it [here](https://nodejs.org/en/download/).
2. Clone the repository with the command `git clone` or by downloading a zip file.

## Set up server folder

3. Navigate to the server directory of the project and run the command `npm install` to install all of the dependencies.
4. Create a file called `.env` and paste the following code:
```
MONGO_URL="mongodb+srv://BOT0001:OurFirstUserxD@cluster0.d9e5gyp.mongodb.net/CEN3031Project?retryWrites=true&w=majority"
ACCESS_TOKEN_SECRET=[your access token secret]
REFRESH_TOKEN_SECRET=[your refresh token secret]
```
5. Paste your access token secret and refresh token secret in the variable definition (with quotes but no brackets)

**To generate a random string for the access token secret and refresh token secret, run the following command in a node terminal: `require('crypto').randomBytes(64).toString('hex')`*

6. Run the command `npm start` to start the server.


## Set up client folder

7. Navigate to the client directory of the project and run the command `npm install` to install all of the dependencies.
8. Create a file called `.env.local` and paste the following code:
```
REACT_APP_GOOGLE_MAPS_API_KEY=[your-api-key-here]
```
9. Paste your Google Maps API key in the variable definition (without brackets or quotes)

**If you need help generating a Google Maps API key, follow this video: https://youtu.be/aKZuDAYZROk. Make sure that you also enable the Places and Directions APIs in the developer console.*

10. Run the command `npm start` to start the client.

---

*Created by Amay Patel, Saurabh Anand, Rohan Chander, and Alejandro Santana for CEN3031 - Introduction to Software Engineering*
