# WTWR (What to Wear?): Back End

This is a back-end Express project that focuses on creating a server for the WTWR application. Two collections of data are created to work with inside a database. The project uses schemas, controllers, and routes to establish item requirements and direct them to the database. It also employs Celebrate middleware using its Joi validation library for JavaScript as validation and error handling to insure that user entered data is valid and the correct server response is communicated if not. Winston s also used as a logging library for log information, including errors and requests. Not only do these tools inform the user of the application, but they allow for faster debugging by the developer. Security and testing is established and web applications are deployed on the Google Cloud. The goal was to create a server with an API and user authorization to implement requests from the front end react application and return valid data for the elements that a user interacts with.

## Project Domain

wtwr-short.jumpingcrab.com

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature via nodemon
