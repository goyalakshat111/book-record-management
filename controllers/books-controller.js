const IssuedBook = require("../dtos/book-dto");
const { UserModel, BookModel } = require("../models");

// here async and await is added because it takes some time like 5-6 seconds 
// so continue with further code and don't give error

exports.getAllBooks = async (req, res) => {
    const books = await BookModel.find();

    if (books.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No book found"
        });
    }

    res.status(200).json({
        success: true,
        data: books
    });
};

exports.getSingleBookById = async (req, res) => {
    const { id } = req.params;
    const book = await BookModel.findById(id);
    if (!book) {
        return res.status(404).json({
            success: false,
            message: "book not found"
        });
    }
    return res.status(200).json({
        success: true,
        data: book
    });
};

exports.getAllIssuedBooks = async (req, res) => {
    const users = await UserModel.find({
        issuedBook: { $exists: true },
    }).populate(issuedBook);

    const issuedBooks = users.map((each) => new IssuedBook(each));


    if (issuedBooks.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No issued books yet"
        });
    }

    return res.status(200).json({
        success: true,
        data: issuedBooks,
    });
};