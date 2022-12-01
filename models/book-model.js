const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    publisher: {
        type: String,
        required: true,
    }
},
    {
        // It will add field that at which time data was added
        timestamps: true
    }
);


// Collection will have a name "books" 
module.exports = mongoose.model("Book", bookSchema);