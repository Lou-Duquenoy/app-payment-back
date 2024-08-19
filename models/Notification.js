const Sequelize = require("sequelize");
const connexion = require("../database");

const Notification = connexion.define("Notifications", {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userId: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  notificationType: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  data: {
    type: Sequelize.JSON,
    allowNull: false,
  },
  isRead: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = Notification;
