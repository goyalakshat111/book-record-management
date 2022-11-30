const express = require('express');

// importing dotenv
const dotenv = require('dotenv');

// Database connection
const DbConnection = require('./databaseConnection');

// importing routes
const usersRouter = require("./routes/users");  //we have written only users instead of users.js 
const booksRouter = require("./routes/books");  //as js is default so we don't need to mention

dotenv.config();                                    // running dotenv


// initialization of app or server , by referencing app we can perform operations
const app = express();

DbConnection();


const PORT = 8081;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is up and running"
    });
});

// if there is any router starting with /users then move to users.js 
app.use("/users", usersRouter);
app.use("/books", booksRouter);


app.get("*", (req, res) => {
    res.status(404).json({
        message: "This server doesn't exist"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});

