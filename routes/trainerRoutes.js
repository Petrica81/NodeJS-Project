const express = require("express");
const {
    createTrainer,
    getAllTrainers,
    getTrainerById,
    updateTrainer,
    deleteTrainer,
} = require("../controllers/trainerController");
const router = express.Router();

router.post("/add", createTrainer);
router.get("/", getAllTrainers);
router.get("/:id", getTrainerById);
router.put("/update/:id", updateTrainer);
router.delete("/delete/:id", deleteTrainer);

module.exports = router;