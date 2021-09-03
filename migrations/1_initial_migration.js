const MongoClient = require("mongodb").MongoClient;

const Migrations = artifacts.require("Migrations");

module.exports = async function (deployer) {
  // Connect to MongoDB
  let dbClient = new MongoClient("mongodb://127.0.0.1:27017")
  await dbClient.connect();
  let dbExample = dbClient.db("example");
  let contracts = dbExample.collection("contracts");

  console.log(dbClient);
  console.log(contracts);

  // Deploy contracts and get information
  await deployer.deploy(Migrations);
  let migrationsInstance = await Migrations.deployed();
  let migrationsJson = migrationsInstance.constructor._json;

  // Save deployed contract in DB (example)
  await contracts.insertOne(migrationsJson)

  // Just to see if its really inserted anything
  console.log(migrationsJson);
};
