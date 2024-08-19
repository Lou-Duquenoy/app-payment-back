require("dotenv").config();
const Sequelize = require("sequelize");

const connexion = new Sequelize(
  process.env.BD_NAME,
  process.env.BD_USER,
  process.env.BD_PASSWORD,
  {
    dialect: "postgres",
	  port:5434,
  }
);

connexion
  .authenticate()
  .then(() => {
    console.log("Connexion success");
  })
  .catch((err) => {
    console.log("Connexion failed");
  });

connexion.sync({ alter: true });

module.exports = connexion;
