const Hero = require("../models/hero");
const Pet = require("../models/pet");
const async = require("async");
const { body, validationResult } = require("express-validator");


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

// Display detail page for a specific Author.
exports.hero_detail = (req, res, next) => {
  async.parallel(
    {
      hero(callback) {
        Hero.findById(req.params.id).exec(callback);
      },
      hero_pets(callback) {
        Pet.find({ hero: req.params.id }, "list of pets").exec(callback);
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

// Display Author create form on GET.
exports.hero_create_get = (req, res, next) => {
  res.render("hero_form", { title: "Create Hero" });
};

// Handle Author create on POST.
exports.hero_create_post = [
    // Validate and sanitize fields.
    body("id", "id must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name must be specified.")
    .isAlphanumeric()
    .withMessage("Name has non-alphanumeric characters."),
    body("pet")
    .escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("hero_form", {
        title: "Create Hero",
        hero: req.body,
        errors: errors.array(),
      });
      return;
    }
    // Data from form is valid.

    // Create an Author object with escaped and trimmed data.
    const hero = new Hero({
      id: req.body.id,
      name: req.body.name,
      pet: req.body.pet,
      _id: req.params.id,
    });
    hero.save((err) => {
      if (err) {
        return next(err);
      }
      // Successful - redirect to new author record.
      res.redirect(hero.url);
    });
  },
];

// Display Author delete form on GET.
exports.hero_delete_get = (req, res, next) => {
  async.parallel(
    {
      hero(callback) {
        Hero.findById(req.params.id).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.hero == null) {
        // No results.
        res.redirect("/catalog/heroes");
      }
      // Successful, so render.
      res.render("hero_delete", {
        title: "Delete Hero",
        hero: results.hero,
      });
    }
  );
};

// Handle Author delete on POST.
exports.hero_delete_post = (req, res) => {
  async.parallel(
    {
      hero(callback) {
        Hero.findById(req.body.heroid).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      // Success
      // Author has no books. Delete object and redirect to the list of authors.
      Hero.findByIdAndRemove(req.body.heroid, (err) => {
        if (err) {
          return next(err);
        }
        // Success - go to author list
        res.redirect("/catalog/heroes");
      });
    }
  );
};

// Display Author update form on GET.
exports.hero_update_get = (req, res) => {
  // Get book, authors and genres for form.
  async.parallel(
    {
      hero(callback) {
        Hero.findById(req.params.id)
          .populate("pets")
          .exec(callback);
      },
      pets(callback) {
        Pet.find(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.hero == null) {
        // No results.
        const err = new Error("Hero not found");
        err.status = 404;
        return next(err);
      }
      // Success.
      res.render("hero_form", {
        title: "Update Hero",
        hero: results.hero,
        pets: results.pets,
      });
    }
  );
};
