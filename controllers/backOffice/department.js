require("dotenv").config();
const Department = require("../../models/Department");
const jwt_decode = require("jwt-decode");
const sequelize = require("sequelize");
//add

module.exports.iDepartment = async (req, res) => {
  try {
    let DepartmentI = await Department.findAll();
    console.log(DepartmentI);
    /*    let AllTeamOzaNR=await TeamOzalentour.findAll({exclude:{where:{'OzalRoles.TeamOzalentourId'}}, include: {model: Roles,required: true}});  */
    res.json({ DepartmentI });
  } catch (err) {
    res.json(err);
  }
};

module.exports.cDepartment = async (req, res) => {
  try {
    console.log(req.body);
    let Name = req.body.name;
    /*         Name={Name:Name}; */
    let DepartmentC = await Department.create({ Name })
      .then((res) => {
        console.log(res);
        return true;
      })
      .catch((err) => {
        return err;
      });
    console.log(DepartmentC);
    res.json({ DepartmentC });
  } catch (err) {
    res.json(err);
  }
};
