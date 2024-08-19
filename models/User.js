const Sequelize = require("sequelize");
const connexion = require("../database");
const Transaction_History = require("./Transaction_History");

const User = connexion.define(
  "Users",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    firstName: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },

    lastName: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    city: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    postalCode: {
      type: Sequelize.STRING(50),
      allowNull: true,
      
    },
    activity: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },

    company: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },

    siret: {
      type: Sequelize.STRING(50),
      allowNull: true,
      
    },
	description: {
	  type: Sequelize.STRING(100),
      allowNull: true,
	},
		
    typeAccount: {
	  type: Sequelize.STRING(100),
	  allowNull: true,
	},
    dateBirth: {
	  type: Sequelize.STRING(100),
	  allowNull: true,
	},
	cityBirth: {
	  type: Sequelize.STRING(100),
	  allowNull: true,	
	},
	firstAddress: {
	  type: Sequelize.STRING(100),
	  allowNull: true,
	},
	secondAddress: {
	  type: Sequelize.STRING(100),
	  allowNull: true,
	},
	denomination: {
	  type: Sequelize.STRING(100),
	  allowNull: true,	
	},
	interest:{
	  type: Sequelize.STRING(100),
	  allowNull: true,	
	},
    email: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },

    phoneNumber: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },

    password: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },

    walletId: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
	  
	BSCWallet: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },

    EUR: {
      type: Sequelize.DECIMAL,
      allowNull: true,
      defaultValue: 20,
    },

    saleConditions: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    ubbleId: {
      type: Sequelize.STRING(255),
    },

    KYC: {
      type: Sequelize.BOOLEAN,
    },
    miTrustId: {
      type: Sequelize.STRING(255),
    },
    KYB: {
      type: Sequelize.BOOLEAN,
    },
    avatar: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "avatarPlaceholder.png",
    },
  },
  {
    freezeTableName: true /* Ensure that the name of the table will be exactly the one passed as argument in the connexion.define() function */,
  }
);


User.belongsToMany(Transaction_History, { through: "Users__Transactions" });
Transaction_History.belongsToMany(User, { through: "Users__Transactions" });

//User.belongsToMany(Address, { through: "Users__Addresses" });
//Address.belongsToMany(User, { through: "Users__Addresses" });

module.exports = User;
