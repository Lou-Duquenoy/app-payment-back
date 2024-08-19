const Sequelize = require("sequelize");
const connexion = require("../database");

const Server_Log = connexion.define("Server_Logs", {
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
  askDateTime: {
    type: Sequelize.DATE(6),
    allowNull: false,
  },
  response: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  responseDateTime: {
    type: Sequelize.DATE(6),
    allowNull: true,
  },
  codeLang: {
    type: Sequelize.STRING(5),
    allowNull: true,
  },
});

module.exports = Server_Log;
