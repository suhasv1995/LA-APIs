const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middlewares/admin/checkadminauth");
const {
  insertMC,
  getAllMC,
  getMCById,
  getMC,
  updateMC,
} = require("../../controllers/admin/mothercategory");

router.param("id", getMCById);

// insert new mothercategory
router.post("/insertMC", insertMC);

// get all mothercategories
router.get("/", getAllMC);

// get single mothercategories
router.get("/:id", getMC);

// update mothercategory
router.put("/:id", updateMC);

// delete mothercategory
//router.delete("/:id", deleteMC);

module.exports = router;
