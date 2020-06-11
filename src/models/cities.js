var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const requiredString = {
  type: String,
  required: true,
};
const requiredNumber = {
  type: Number,
  required: true,
};

var citiesSchema = new Schema({
  cityName: requiredString,
  stateId: requiredString,
  cityCode: String,
  status: {
    type: Number,
    min: 0,
    max: 2,
    default: 1,
  },
});
const CityEntry = mongoose.model("CityEntry", citiesSchema);
module.exports = CityEntry;
