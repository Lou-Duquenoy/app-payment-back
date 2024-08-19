const Sequelize = require("sequelize");
const connexion = require("../database");
const Roles = require("./role");
const OzaRoles = require("./OzaRoles");

const TeamOzalentour = connexion.define(
  "TeamOzalentours",
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
    
   
    Department: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },

    companyName: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },

    email: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },

    phoneNumber: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },

    password: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
	  avatar: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "avatarPlaceholder.png",
    },
    pendingRole: {
      type: Sequelize.BOOLEAN,
      defaultValue:true,
    },
    
  },
  {
    //freezeTableName: true /* Ensure that the name of the table will be exactly the one passed as argument in the connexion.define() function */,
  }
);

TeamOzalentour.belongsToMany(Roles, { through: "OzaRoles" });
Roles.belongsToMany(TeamOzalentour, { through: "OzaRoles" });

//TeamOzalentour.sync({alter:true});

/* const TeamOzalentour1 = await TeamOzalentour.create();
const Roles = await Roles.create();

const OzaRoles = await OzaRoles.create({
  TeamOzalentourId: TeamOzalentour1.userId,
  roleId: Roles.cityId,
}); */
// We search into the database for the user with email we receive from the controller
/* TeamOzalentour.getTeamOza = async (userData, res) => {
  const email = userData;
  //console.log(" User model userData", email);

  const user = await TeamOzalentour.findOne({ where: { email } },include: {model: Roles,required: true}).catch((err) => {
    console.log(err);
  });

  // console.log(" User model user", user.dataValues);
  return user.dataValues;
}; */

TeamOzalentour.SetRole= async (data,res)=> {
  let ozaId=data.ozaId;
  let roleId=data.roleId
  const michel= await TeamOzalentour.create({include:[Roles]})
  console.log(michel);
  return michel;
} 

module.exports = TeamOzalentour;
