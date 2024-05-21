const express = require("express");
const {
    createFacility,
    getAllFacilities,
    getFacilityById,
    updateFacility,
    deleteFacility,
} = require("../controllers/facilityController");
const {  verifyAuth, verifyAdmin } = require("../middlewares/authorization");
const router = express.Router();

router.post("/add", verifyAuth, verifyAdmin, createFacility);
router.get("/", verifyAuth, getAllFacilities);
router.get("/:id", verifyAuth, getFacilityById);
router.put("/update/:id", verifyAuth, verifyAdmin, updateFacility);
router.delete("/delete/:id", verifyAuth, verifyAdmin, deleteFacility);

module.exports = router;