//  Add your code here

// IMPORT MONGOOSE
const mongoose = require("mongoose");

// CREATE A SCHEMA - defines the shape of the documents - Iteration 2
const celebritySchema = new mongoose.Schema({
  name: String,
  occupation: String,
  catchPhrase: String,
});

// CREATE THE MODEL
const Celebrity = mongoose.model("Celebrity", celebritySchema);

// EXPORT THE MODEL
module.exports = Celebrity;
