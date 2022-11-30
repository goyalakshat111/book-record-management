const mongoose = require('mongoose');

function DbConnection() {

    const DB_URL = process.env.MONGO_URI;

    mongoose.connect(DB_URL, {
        useNewUrlParser: true,        // default settings for improving perfomance
        useUnifiedTopology: true
    });

    // after successful connection , store its details in db variable
    const db = mongoose.connection;

    db.on("error", console.error.bind(console, 'Connection error:'));

    db.once("open", function () {
        console.log("Db Connected...");
    });
}


module.exports = DbConnection;