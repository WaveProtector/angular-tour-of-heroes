const express = require("express");
const router = express.Router();

// Require controller modules.
const hero_controller = require("../controllers/heroController");
const pet_controller = require("../controllers/petController");

router.get("/", hero_controller.index);

/// HERO ROUTES ///

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get("/heroes", hero_controller.heroes_get);

// POST request for creating Book.
router.post("/hero/:id", hero_controller.hero_get);

// GET request to delete Book.
router.get("/hero", hero_controller.hero_create_post);

// POST request to delete Book.
router.post("/hero/:id/delete", hero_controller.hero_delete_post);

// GET request to update Book.
router.get("/hero/:id/update", hero_controller.hero_update_get);


/// PET ROUTES ///

// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
router.get("/pets", pet_controller.pets_get);

// POST request for creating Author.
router.post("/pet/:id", pet_controller.pet_get);


module.exports = router;
