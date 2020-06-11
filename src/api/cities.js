const { Router } = require("express");
const CityEntry = require("../models/cities");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const entries = await CityEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const cityEntry = new CityEntry(req.body);
    const createdCity = await cityEntry.save();
    res.json(createdCity);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(422);
    }
    next(error);
  }
});

module.exports = router;
