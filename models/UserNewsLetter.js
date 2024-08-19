const Sequelize = require("sequelize");
const connexion = require("../database");

const UserNewsLetter = connexion.define(
  "UsersNewsLetter",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    fistName: {
      type: Sequelize.STRING(100),
	  allowNull: true,
	},
	society: {
      type: Sequelize.STRING(100),
	  allowNull: true,
	},
	email: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
	
  },
  {
    freezeTableName: true /* Ensure that the name of the table will be exactly the one passed as argument in the connexion.define() function */,
  }
);

module.exports = UserNewsLetter;
