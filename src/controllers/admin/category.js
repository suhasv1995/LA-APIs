const category = require("../../models/category");

exports.getCatById = async (req, res, next, id) => {
  try {
    await category.findById(id).exec((error, cat) => {
      if (error || !cat) {
        return res.status(400).json({
          error: "Something went wrong. Please try again",
        });
      }
      req.catData = cat;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.insertCat = async (req, res) => {
  try {
    const { catName } = req.body;
    // check if same category already exists
    await category.findOne({ catName }, (error, cat) => {
      if (error) {
        return res.status(400).json({
          error: "Something went wrong. Please try again",
        });
      }
      if (cat) {
        return res.status(400).json({
          error: "Category already exists",
        });
      }
    });
    // insert into category table
    const newCat = new category({
      catName: req.body.catName,
      mcId: req.body.mcId,
      catSmallDesc: req.body.catSmallDesc,
      catDesc: req.body.catDesc,
      catDeliveryCharge: req.body.catDeliveryCharge,
      catDeliveryDuration: req.body.catDeliveryDuration,
      catDeliveryDurationText: req.body.catDeliveryDurationText,
      catExpressDeliveryDuration: req.body.catExpressDeliveryDuration,
      catExpressDeliveryDurationText: req.body.catExpressDeliveryDurationText,
      catImage: req.body.catImage,
    });
    //console.log(newCat);
    newCat.save((error, cat) => {
      if (error) {
        return res.status(400).json({
          error: "Not able to insert user in DB - cat",
        });
      }
      res.json({
        error: null,
        data: {
          message: "Category added successfully",
        },
      });
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getAllCat = async (req, res) => {
  try {
    await category.find().exec((error, cat) => {
      if (error || !category) {
        return res.status(400).json({
          error: "Categories not found",
        });
      }
      res.json({
        error: null,
        data: {
          cat,
        },
      });
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getCat = async (req, res) => {
  try {
    return res.json({
      error: null,
      data: req.catData,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.updateCat = async (req, res) => {
  try {
    await category.findByIdAndUpdate(
      { _id: req.catData._id },
      { $set: req.body },
      { new: true, useFindAndModify: true },
      (error, cat) => {
        if (error) {
          return res.status(400).json({
            error: "Category not updated. Please try again",
          });
        }
        res.json({
          error: null,
          data: cat,
        });
      }
    );
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
