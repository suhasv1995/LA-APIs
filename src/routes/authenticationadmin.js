var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");

const {
  signup,
  signin,
  signout,
} = require("../controllers/authenticationadmin");

// signup route
router.post(
  "/signup",
  [
    check("username")
      .not()
      .isEmpty()
      .isLength({ min: 10 })
      .withMessage("Please enter a valid user name"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("Please enter a valid password"),
  ],
  signup
);

// signin route
router.post(
  "/signin",
  [
    check("username")
      .not()
      .isEmpty()
      .isLength({ min: 10 })
      .withMessage("Please enter a valid user name"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("Please enter a valid password"),
  ],
  signin
);

// signout route
router.get("/signout", signout);

module.exports = router;
