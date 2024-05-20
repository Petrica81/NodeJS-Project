const express = require("express");
const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} = require("../controllers/userController");
const router = express.Router();

router.post("/add", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;