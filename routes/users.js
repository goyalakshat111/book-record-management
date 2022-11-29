const express = require("express");

const { users } = require("../data/users.json");

// initialization of router
const router = express.Router();

/**
 * Route: /users
 *  Method: GET
 * Description: Get all users
 * Access: Public
 * Parameters: None  (parameters are used if we are sending some additional data)
 */

router.get("/", (req, res) => {  // removed /users as that is already used in index.js if we
    res.status(200).json({       //mention here again then {vari_name}/users/users will use
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

router.get("/:id", (req, res) => {
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

router.post('/', (req, res) => {
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

router.put("/:id", (req, res) => {
    const { id } = req.params;                 //here params,body is object of req
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

/**
 * Route:/users/:id
 *  Method: DELETE
 * Description: Delete a user by id
 * Access: Public
 * Parameters: id
 */

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User to be deleted not found"
        });
    }

    const index = users.indexOf(user);
    users.splice(index, 1);
    return res.status(202).json({ success: true, data: users });

});

// default export,exporting the router

module.exports = router;
