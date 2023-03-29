const Pet = require("../models/pet");
const async = require("async");

// Display list of all Authors.
exports.pets_get = (req, res) => {
  Pet.find()
  .sort([["name", "ascending"]])
  .exec(function (err, list_pets) {
    if (err) {
      return next(err);
    }
    //Successful, so render
    res.render("pet_list", {
      title: "Pet List",
      pet_list: list_pets,
    });
  });
};

// Display detail page for a specific Author.
exports.pet_get = (req, res) => {
  async.parallel(
    {
      pet(callback) {
        Pet.findById(req.params.id).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        // Error in API usage.
        return next(err);
      }
      if (results.pet == null) {
        // No results.
        const err = new Error("Pet not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render("pet_detail", {
        title: "Pet Detail",
        pet: results.pet,
      });
    }
  );
};
