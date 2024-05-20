const express = require("express");
const {
    createFacility,
    getAllFacilities,
    getFacilityById,
    updateFacility,
    deleteFacility,
} = require("../controllers/facilityController");
const router = express.Router();

router.post("/add", createFacility);
router.get("/", getAllFacilities);
router.get("/:id", getFacilityById);
router.put("/update/:id", updateFacility);
router.delete("/delete/:id", deleteFacility);

module.exports = router;