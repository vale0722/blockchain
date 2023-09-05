const { Sequelize } = require("sequelize");
const config = require("../../config/database");
const fs = require("fs");
const path = require("path");
const db = {};
const basename = path.basename(__filename);

db.connection = new Sequelize(
  config.dialect,
  null,
  null,
  config.options
);

if (process.env.NODE_ENV !== "test") {
  db.connection
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((error) => {
      console.error("Unable to connect to the database:", error);
    });
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      db.connection,
      Sequelize.DataTypes
    );
    console.log(model.name);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db.connection);
  }
});

module.exports = db;
