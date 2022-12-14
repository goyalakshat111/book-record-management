const express = require("express");

//importing books data
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const { getAllBooks, getSingleBookById, getAllIssuedBooks } = require("../controllers/books-controller");

const router = express.Router();


/**
 * Route: /books
 *  Method: GET
 * Description: Get all books
 * Access: Public
 * Parameters: None
 */

router.get("/", getAllBooks);

/**
 * Route: /books/:id
 *  Method: GET
 * Description: Get all books by id
 * Access: Public
 * Parameters: id
 */

router.get("/:id", getSingleBookById);

/**
 * Route: /books/issued/by-user
 * Method: GET
 * Description: Get all issued books
 * Access: Public
 * Parameters: none
 */

router.get("/issued/by-user", getAllIssuedBooks);

/**
 * Route: /books/issued/by-user
 * Method: POST
 * Description: Create a new book
 * Access: Public
 * Parameters: none
 * Data : author, name, genre, publisher, price etc.
 */

router.post("/", (req, res) => {
    const { data } = req.body;

    if (!data) {
        return res.status(400).json({
            success: false,
            message: "No data provided",
        });
    }

    const book = books.find((each) => each.id === data.id);

    if (book) {
        return res.status(404).json({
            success: false,
            message: "Book already exists with this id, please use a unique id",
        });
    }

    const allBooks = [...books, data];

    return res.status(201).json({
        success: true,
        data: allBooks,
    });
});


/**
 * Route: /books/:id
 * Method: PUT
 * Description: Update book by id
 * Access: Public
 * Parameters: id
 * Data : author, name, genre, publisher, price etc.
 */

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const book = books.find((each) => each.id === id);

    if (!book) {
        return res.status(400).json({
            success: false,
            message: "Book not found with this particular id"
        });
    }

    const updatedData = books.map((each) => {
        if (each.id === id) {
            return { ...each, ...data };
        }
        return each;
    });
    return res.status(200).json({
        success: true,
        data: updatedData
    });
});







module.exports = router;
