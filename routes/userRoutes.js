const express = require("express");
const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    register,
    login,
    registerAdmin
} = require("../controllers/userController");
const {  verifyAuth, verifyAdmin } = require("../middlewares/authorization");
const router = express.Router();

router.post("/add", verifyAuth, verifyAdmin, createUser);
router.post("/register", register);
router.post("/login", login);
router.get("/", verifyAuth, verifyAdmin, getAllUsers);
router.get("/:id", verifyAuth, getUserById);
router.put("/update/:id", verifyAuth, updateUser);
router.delete("/delete/:id", verifyAuth, deleteUser);
router.post("/secret/createadmin", registerAdmin);

module.exports = router;