require("dotenv").config();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
//const SibApiV3Sdk = require("sib-api-v3-sdk");
const jwt_decode = require("jwt-decode");
const { Op } = require("sequelize");
const TeamOzalentour = require("../../models/TeamOzalentour");
const Roles = require("../../models/role");
const OzaRoles = require("../../models/OzaRoles");
const Departments = require("../../models/Department");
const saltRounds = 10;
const generateToken = require("../../services/jsonWebToken/generator");
module.exports.indexOzaTeam = async (req, res) => {
  let AllTeamOza = await TeamOzalentour.findAll();
  console.log(AllTeamOza);
  res.json({ AllTeamOza });
};
const regEmail = /^[a-zA-Z0-9._:$!%-]+@ozalentour.fr$/;
const regPassword =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^:;,?µ£¨<>+=&-*]).{12,}$/;
module.exports.addUserOza = async (req, res) => {
  try {
    let userData = req.body;
    console.log("USER", userData);
    let email = userData.email;
    let firstName = userData.firstName;
    let lastName = userData.lastName;
    let Department = userData.Department;
    let number = userData.phoneNumber;
    let password = userData.password;
    //console.log("userController userInfos", req.body);
    /*       let templateId=whereLangue(langue); */
    if (!regEmail.test(email) || !regPassword.test(password)) {
      console.log("error");
      res.json({ message: "fuck you" });
    } else {
      // We hash the password
      const hash = await bcrypt.hash(password, saltRounds);
      if (hash) {
        password = hash;
        userData.password = password;
      }

      console.log("new password hash", userData.password);
      // We create a new user with all datas we set before
      const newUser = await TeamOzalentour.create(userData, res);

      res.json({ message: "Votre compte a été créé" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
};
module.exports.login = async (req, res, next) => {
  // We get the email and password data from the front end form
  try {
    const visitorData = req.body;
    console.log("loginController visitorData" + visitorData);
    let email=visitorData.email;
    let password=visitorData.password;

    console.log("loginController visitorData" + email, password);
    // We search into the database for a user with an email equal to the one we got in the front end form
    const userData = await TeamOzalentour.findOne({
      where:{
        email:email
      },
      include: {model: Roles,required: true}}).then(res=>{return res;});
      console.log("ici on recupere la data de l'user",userData);
/*     console.log(userData.roles[0].name);
    console.log(" loginController userData ", userData.password); */
    // We check if the password we get in the front end form matches with the one in databse for this email
    bcrypt.compare(
      visitorData.password,
      userData.password,
      async function (err, result) {
        // If the password is not correct, we return an error message
        if (!result) {
          visitorData.errors = "Email ou mot de passe invalide";
          res.status(403).json(visitorData.errors);
        } else {
/*           const roleOza=await Roles.findOne({where : {userOzaId:userData.id}});
          console.log(roleOza.roleId); */
/*           const roleOzaN=await Roles.findOne({where : { id:roleOza.roleId}});
          console.log(roleOzaN); */
		  
          const token = generateToken(
            {
              email: userData.email
			  
            },
            res,userData.roles[0].name
          );
        }
      }
    );
  } catch (err) {
    console.trace(err);
    res.status(500).json({ error: "Erreur de connexion" });
  }
};
// if (!user || user.password !== password) {
//     res.json({ message: "Email ou mot de passe invalide" });
//   }

module.exports.PIOzaTeam = async (req, res) => {
  try {
    let AllTeamOza = await TeamOzalentour.findAll({
      where: { pendingRole: true },
    });
    /*     let AllTeamOza=await TeamOzalentour.findAll({include:[Roles]});   */
    console.log(AllTeamOza);
    /*    let AllTeamOzaNR=await TeamOzalentour.findAll({exclude:{where:{'OzalRoles.TeamOzalentourId'}}, include: {model: Roles,required: true}});  */
    res.json({ AllTeamOza });
  } catch (err) {
    res.json(err);
  }
};

module.exports.oneOzaTeam = async (req, res) => {
  try {
    let id = req.body;
    id = id.id;
    console.log(id);
    let userOza = await TeamOzalentour.findOne({ where: { id: id } });
    console.log(userOza);
    /*    let AllTeamOzaNR=await TeamOzalentour.findAll({exclude:{where:{'OzalRoles.TeamOzalentourId'}}, include: {model: Roles,required: true}});  */
    res.json({ userOza });
  } catch (err) {
    res.json(err);
  }
};

module.exports.AllOzaTeamByTeam = async (req, res) => {
  try {
    let department = req.body.Department;
    console.log(department);
    let userOza = await TeamOzalentour.findAll({
      where: { Department: department },
      include: { model: Roles, required: true },
    });
    console.log(userOza);
    /*    let AllTeamOzaNR=await TeamOzalentour.findAll({exclude:{where:{'OzalRoles.TeamOzalentourId'}}, include: {model: Roles,required: true}});  */
    res.json({ userOza });
  } catch (err) {
    res.json(err);
  }
};

module.exports.IRole = async (req, res) => {
  try {
    let RoleOza = await Roles.findAll();
    console.log(RoleOza);
    /*    let AllTeamOzaNR=await TeamOzalentour.findAll({exclude:{where:{'OzalRoles.TeamOzalentourId'}}, include: {model: Roles,required: true}});  */
    res.json({ RoleOza });
  } catch (err) {
    res.json(err);
  }
};

module.exports.ChaneMRoleOza = async (req, res) => {
  try {
    let data = req.body;
    let id = data.id;
    let department = data.department;
    let role = data.Role;
    let changedoneornot = await TeamOzalentour.findOne({
      where: {
        id: id,
      },
    }).then((res) => {
      //console.log(res);
      return res;
    });
    let idRole = await Roles.findOne({ where: { name: role } }).then((res) => {
      //console.log(res);
      return res;
    });
    let dataOza = {
      TeamOzalentourId: id,
      roleId: idRole.id,
    };
    let doneOrNot = await OzaRoles.create(dataOza)
      .then((res) => {
        console.log(res);
        return true;
      })
      .catch((err) => {
        return err;
      });
    let departmentchangedone = await changedoneornot
      .update({ Department: department, pendingRole: false })
      .then((res) => {
        return true;
      })
      .catch((err) => {
        return false;
      });
    //console.log(departmentchangedone);
    res.json(true);
  } catch (err) {
    res.json(err);
  }
  //changedoneornot.update({include:[Roles],Department:department,Roles:idRole})
  /*    let AllTeamOzaNR=await TeamOzalentour.findAll({exclude:{where:{'OzalRoles.TeamOzalentourId'}}, include: {model: Roles,required: true}});  */
  /*   res.json({RoleOza});  */
};

module.exports.deletedMemberOza = async (req, res) => {
  try {
    //on recupere l'id
    let id = req.body.id;
    //on supprime les comptes
    let MemberDeleted = await TeamOzalentour.destroy({
      where: { id: id },
    }).then((res) => {
      console.log(res);
    });
    let roleDeleteOza = await OzaRoles.destroy({
      where: { TeamOzalentourId: id },
    }).then((res) => {
      console.log(res);
    });
    // on verifie que les 2 destroy nous renvoie un return
    /*    let AllTeamOzaNR=await TeamOzalentour.findAll({exclude:{where:{'OzalRoles.TeamOzalentourId'}}, include: {model: Roles,required: true}});  */
    /* res.json({RoleOza}); */
  } catch (err) {
    res.json(err);
  }
};

module.exports.myUser = async (req, res) => {
  try {
    let data = req.body;
  } catch (err) {
    res.json(err);
  }
};
module.exports.myUserRole = async (req, res) => {
  try {
    let data = req.body;
    let token = data.token;
    let decoded = jwt_decode(token);
    let User = await TeamOzalentour.findOne({
      where: {
        email: decoded.email,
      },
      include: { model: Roles, required: true },
    });
    let userRoles = { roles: User.roles };
    res.json({ userRoles });
  } catch (err) {
    res.json(err);
  }
};
module.exports.soldeTotalOzp = async (req, res) => {
    try{
        let UsersSolde= await User.sum('OZP')
    res.json({UsersSolde});
    }
    catch(err){
        res.json(err);
    }
  }
module.exports.indexUser= async (req, res) => {
    try{
        let Users=await User.findAll();
        console.log(Users);
        res.json({Users});
    }catch(err){
    res.json(err);
}
   
}

module.exports.DeletedUser= async (req, res) => {
    try{
        let data=req.body;
    let id=data.id;
    let email=data.email;
    console.log(id,email);
    let cheeck= await User.findOne({where:{id:id,email:email}});
    console.log(cheeck);
    if(cheeck){
       try{
        console.log("partie try");
        /* await User.destroy({where: { id:id}}).then((res)=>{console.log(res);return res=true}); */
       return res.json({message:true});
       }catch(err){
        res.json({message:false})
    }
    }else{
        res.status(200).json({message:"it's no user find"})
    }
    }
    catch(err){
        res.json(err);
    }
    
}