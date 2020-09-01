const motherCategory = require("../../models/mothercategory");

exports.getMCById = async (req, res, next, id) => {
  try {
    await motherCategory.findById(id).exec((error, mc) => {
      if (error || !mc) {
        return res.status(400).json({
          error: "Mothercategory does not exist",
        });
      }
      req.mcData = mc;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.insertMC = async (req, res) => {
  try {
    const { mcName } = req.body;
    // check if same mothercategory already exists
    await motherCategory.findOne({ mcName }, (error, mc) => {
      if (error) {
        return res.status(400).json({
          error: "Something went wrong. Please try again",
        });
      }
      if (mc) {
        return res.status(400).json({
          error: "Mothercategory already exists",
        });
      }
    });
    // insert into mothercategory table
    const newMC = new motherCategory({
      mcName: req.body.mcName,
      mcSmallDesc: req.body.mcSmallDesc,
      mcDesc: req.body.mcDesc,
      minOrderValue: req.body.minOrderValue,
      deliveryCharge: req.body.deliveryCharge,
      deliveryDuration: req.body.deliveryDuration,
      deliveryDurationText: req.body.deliveryDurationText,
      expressMultiplier: req.body.expressMultiplier,
      expressDeliveryDuration: req.body.expressDeliveryDuration,
      expressDeliveryDurationText: req.body.expressDeliveryDurationText,
      mcImage: req.body.mcImage,
    });
    //console.log(newMC);
    newMC.save((error, mc) => {
      if (error) {
        return res.status(400).json({
          error: "Not able to insert user in DB - MC",
        });
      }
      res.json({
        error: null,
        data: {
          message: "Mothercategory added successfully",
        },
      });
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getAllMC = async (req, res) => {
  try {
    await motherCategory.find().exec((error, mc) => {
      if (error || !mc) {
        return res.status(400).json({
          error: "Mothercategories not found",
        });
      }
      res.json({
        error: null,
        data: {
          mc,
        },
      });
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getMC = async (req, res) => {
  try {
    return res.json({
      error: null,
      data: req.mcData,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.updateMC = async (req, res) => {
  try {
    await motherCategory.findByIdAndUpdate(
      { _id: req.mcData._id },
      { $set: req.body },
      { new: true, useFindAndModify: true },
      (error, mc) => {
        if (error) {
          return res.status(400).json({
            error: "Mothercategory not updated. Please try again",
          });
        }
        res.json({
          error: null,
          data: mc,
        });
      }
    );
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// exports.deleteMC = async (req, res) => {
//   try {
//     await motherCategory.findByIdAndUpdate(
//       { _id: req.mcData._id },
//       { $set: req.body },
//       { new: true, useFindAndModify: true },
//       (error, mc) => {
//         if (error) {
//           return res.status(400).json({
//             error: "Mothercategory not updated. Please try again",
//           });
//         }
//         res.json({
//           error: null,
//           data: mc,
//         });
//       }
//     );
//   } catch (error) {
//     return res.status(500).json({
//       error: error.message,
//     });
//   }
// };
