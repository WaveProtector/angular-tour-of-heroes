const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PetSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
});

// Virtual for author's URL
PetSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/pet/${this._id}`;
});

// Export model
module.exports = mongoose.model("Pet", PetSchema);
