const Sequelize = require("sequelize");
const connexion = require("../database");
const Activity_Category = require("./Activity_Category");
const Address = require("./Address");
const Activity = connexion.define(
  "Activities",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
	userId : {
	  type: Sequelize.INTEGER,
	  allowNull: true,	
	},
    
	name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
	
    city: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    minimumPrice: {
      type: Sequelize.STRING,
      allowNull: true,
    },
	tarifMode: {
      type: Sequelize.STRING,
      allowNull: true,
    },  
    cashBack: {
      type: Sequelize.STRING,
      allowNull: true,
    },
	cashBackMode: {
      type: Sequelize.STRING,
      allowNull: true,
    }, 
	validity: {
      type: Sequelize.STRING,
      allowNull: true,
    },
	  
	picture: {
      type: Sequelize.STRING,
      allowNull: true,
    },  
	  
	website: {
      type: Sequelize.STRING,
      allowNull: true,
    },
	
	phoneNumber: {
      type: Sequelize.STRING,
      allowNull: true,
    },
	  
	typeActivity: {
      type: Sequelize.STRING,
      allowNull: true,
    },
	  
	selectedDay: {
      type: Sequelize.STRING,
      allowNull: true,
    },
	  
	selectedCategory: {
      type: Sequelize.STRING,
      allowNull: true,
    },
	  
	presentation: {
      type: Sequelize.STRING,
      allowNull: true,
    },
	  
	selectedEquipment: {
      type: Sequelize.STRING,
      allowNull: true,
    },
	  
	precision: {
      type: Sequelize.STRING,
      allowNull: true,
    },
	  
	morningDate1: {
	  type: Sequelize.STRING,
      allowNull: true,
	},
	  
	morningDate2: {
	  type: Sequelize.STRING,
      allowNull: true,
	}, 
	
	afternoonDate1: {
	  type: Sequelize.STRING,
      allowNull: true,
	},

	afternoonDate2: {
	  type: Sequelize.STRING,
      allowNull: true,
	}  
  },
  {
    freezeTableName: true, // add comma here
    timestamps: false,
  }
);

Activity.hasOne(Activity_Category);
Activity_Category.belongsTo(Activity);

Activity.hasOne(Address);
Address.belongsTo(Activity);


module.exports = Activity;