const express = require("express");
const {
    createSession,
    getAllSessions,
    getSessionById,
    updateSession,
    deleteSession,
} = require("../controllers/sessionController");
const router = express.Router();

router.post("/add", createSession);
router.get("/", getAllSessions);
router.get("/:id", getSessionById);
router.put("/update/:id", updateSession);
router.delete("/delete/:id", deleteSession);

module.exports = router;