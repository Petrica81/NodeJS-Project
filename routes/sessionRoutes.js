const express = require("express");
const {
    createSession,
    getAllSessions,
    getSessionById,
    updateSession,
    deleteSession,
} = require("../controllers/sessionController");
const {  verifyAuth, verifyAdmin } = require("../middlewares/authorization");
const validateSession = require("../middlewares/validateSession");
const router = express.Router();

router.post("/add", verifyAuth, validateSession, createSession);
router.get("/", verifyAuth, verifyAdmin, getAllSessions);
router.get("/:id", verifyAuth, getSessionById);
router.put("/update/:id", verifyAuth, verifyAdmin, updateSession);
router.delete("/delete/:id", verifyAuth, deleteSession);

module.exports = router;