const Sequelize = require("sequelize");
const connexion = require("../database");

const Address = connexion.define(
  "Addresses",
  {
    id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    country: {
      type: Sequelize.STRING,
      allowNull: false,
    },
	  
	city: {
    type: Sequelize.STRING,
    allowNull: false,
    },
	  
	postCode: {
    type: Sequelize.INTEGER,
    allowNull: false,
    },

	streetNumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
    },
	  
	streetName: {
    type: Sequelize.TEXT,
    allowNull: false,
    },
	
  },
  {
    freezeTableName: true, // add comma here
    timestamps: false,
  }
);

module.exports = Address;