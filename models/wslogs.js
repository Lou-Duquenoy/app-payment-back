const Sequelize = require("sequelize");
const connexion = require("../database");

const wslogs = connexion.define("wslogs", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  url: {
    type: Sequelize.STRING(45),
    allowNull: false,
  },
  ip: {
    type: Sequelize.STRING(15),
    allowNull: false,
  },
  parameters: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  askdatetime: {
    type: Sequelize.DATE(6),
    allowNull: false,
  },
  response: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  responsedatetime: {
    type: Sequelize.DATE(6),
    allowNull: true,
  },
  codelang: {
    type: Sequelize.STRING(5),
    allowNull: true,
  },
});
