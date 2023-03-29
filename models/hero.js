const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HeroSchema = new Schema({
  id: {type: Number, required: true},
  name: { type: String, required: true, maxLength: 100 },
  pet: {type: Schema.Types.ObjectId, ref: "Hero"},
});

// Virtual for author's URL
HeroSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/hero/${this._id}`;
});

// Export model
module.exports = mongoose.model("Hero", HeroSchema);
