const express = require('express');

//JSON data import
const { users } = require("./data/users.json");          //destructuring
const app = express();

const PORT = 8081;

app.use(express.json());


app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is up and running"
    });
});

/**
 * Route: /users
 *  Method: GET
 * Description: Get all users
 * Access: Public
 * Parameters: None  (parameters are used if we are sending some additional data)
 */

app.get("/users", (req, res) => {
    res.status(200).json({
        success: true,
        data: users
    });
});

/**
 * Route: /users/:id
 *  Method: GET
 * Description: Get all users by id
 * Access: Public
 * Parameters: id
 */

app.get("/users/:id", (req, res) => {
    const { id } = req.params;                                // Getting id from parameters
    const user = users.find((each) => each.id === id);     // finding user from array
    if (!user) {                                           // security check that give 
        return res.status(404).json({                        // error if user not found
            success: false,
            message: "user not found"
        });
    }

    return res.status(200).json({
        success: true,
        data: user
    });
});

/**
 * Route: /users
 *  Method: POST
 * Description: Create new user
 * Access: Public
 * Parameters: none
 */

app.post('/users', (req, res) => {
    const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body;
    const user = users.find((each) => each.id === id);
    if (user) {
        return res.status(404).json({
            success: false,
            message: "User already exists"
        });
    }

    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate
    });

    return res.status(201).json({
        success: true,
        data: users,
    });
});

/**
 * Route: /users/:id
 *  Method: PUT                        We can also use PATCH method , they are almost same
 * Description: Updating user data
 * Access: Public
 * Parameters: id
 */

app.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const user = users.find((each) => each.id === id);

    if (!user) return res.status(404).json({ success: false, message: "user not found" });

    const updatedUser = users.map((each) => {
        if (each.id === id) {
            return {
                ...each,
                ...data,
            };
        }
        return each;
    });

    return res.status(200).json({
        success: true,
        data: updatedUser,
    })
});

app.get("*", (req, res) => {
    res.status(404).json({
        message: "This server doesn't exist"
    });
});


app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});