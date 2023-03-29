const Hero = require("../models/hero");
const Pet = require("../models/pet");
const async = require("async");

exports.index = (req, res) => {
    async.parallel(
        {
          hero_count(callback) {
            Hero.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
          },
          pet_count(callback) {
            Pet.countDocuments({}, callback);
          },
        },
        (err, results) => {
          res.render("index", {
            title: "Tour of heroes Home",
            error: err,
            data: results,
          });
        }
    );
};

// Display list of all Authors.
exports.heroes_get = (req, res) => {
  Hero.find()
  .sort([["name", "ascending"]])
  .exec(function (err, list_heroes) {
    if (err) {
      return next(err);
    }
    //Successful, so render
    res.render("hero_list", {
      title: "Hero List",
      hero_list: list_heroes,
    });
  });
};

// Display Author create form on GET.
exports.hero_get = (req, res) => {
  async.parallel(
    {
      hero(callback) {
        Hero.findById(req.params.id).exec(callback);
      },
      hero_pets(callback) {
        Pet.find({ hero: req.params.id }, "owned pets").exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        // Error in API usage.
        return next(err);
      }
      if (results.hero == null) {
        // No results.
        const err = new Error("Hero not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render("hero_detail", {
        title: "Hero Detail",
        hero: results.hero,
        hero_pets: results.hero_pets,
      });
    }
  );
};

// Handle Author create on POST.
exports.hero_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Author create POST");
};

// Handle Author delete on POST.
exports.hero_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Author delete POST");
};

// Display Author update form on GET.
exports.hero_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Author update GET");
};
