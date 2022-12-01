const mongoose = require('mongoose');
const bookModel = require('./book-model');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    issuedBook: {

        // User is having issued book field which is id of book
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: false,
    },
    returnDate: {
        type: String,
        required: false,
    },
    subscriptionType: {
        type: String,
        required: true,
    },
    subscriptionDate: {
        type: String,
        required: true,
    },

},
    {
        // It will add field that at which time data was added
        timestamps: true
    }
);


// Collection will have a name "users" 
module.exports = mongoose.model("User", userSchema);