const express = require("express");
const {
    createTrainer,
    getAllTrainers,
    getTrainerById,
    updateTrainer,
    deleteTrainer,
} = require("../controllers/trainerController");
const {  verifyAuth, verifyAdmin } = require("../middlewares/authorization");
const router = express.Router();

router.post("/add", verifyAuth, verifyAdmin, createTrainer);
router.get("/", verifyAuth, getAllTrainers);
router.get("/:id", verifyAuth, getTrainerById);
router.put("/update/:id", verifyAuth, verifyAdmin, updateTrainer);
router.delete("/delete/:id", verifyAuth, verifyAdmin, deleteTrainer);

module.exports = router;