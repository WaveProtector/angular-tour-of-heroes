#! /usr/bin/env node

console.log(
    'This script populates some test heroes and pets to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Hero = require("./models/hero");
  const Pet = require("./models/pet");
  
  const heroes = [];
  const pets = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false); // Prepare for Mongoose 7
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createHeroes();
    await createPets();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  async function heroCreate(id, name, pet) {
    herodetail = { id: id, name: name, pet: pet };
    if (pet != null) herodetail.pet = pet;

    const hero = new Hero(herodetail);
  
    await hero.save();
    heroes.push(hero);
    console.log(`Added hero: ${id} ${name}`);
  }

  async function petCreate(name) {
    petdetail = { name: name };
  
    const pet = new Pet(herodetail);
  
    await pet.save();
    pets.push(pet);
    console.log(`Added pet: ${name}`);
  }
  
  async function createHeroes() {
    console.log("Adding heroes");
    await Promise.all([
      heroCreate(12, "Dr. Nice", null),
      heroCreate(13, "Bombasto", null),
      heroCreate(14, "Celeritas", null),
      heroCreate(15, "Billings", null),
      heroCreate(16, "RubberMan", null),
      heroCreate(17, "Dynama", null),
      heroCreate(18, "Dr. IQ", null),
      heroCreate(19, "Magma", null),
      heroCreate(20, "Tornado", null),
    ]);
  }
  
  async function createPets() {
    console.log("Adding pets");
    await Promise.all([
      petCreate("Max"),
      petCreate("Spark"),
      petCreate("Sonic"),
      petCreate("Tails"),
      petCreate("Knuckles"),
      petCreate("shadow"),
    ]);
  }
  