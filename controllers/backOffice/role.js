require("dotenv").config();
const { Op } = require("sequelize");
const Roles = require("../../models/role");


module.exports.createRole= async (req, res) => {
    try{
        let data=req.body;
        console.log(data);
        let name=data.name;
        let createRole= await Roles.create({name:name});
       /*  let AllTeamOza=await TeamOzalentour.findAll();
        console.log(AllTeamOza);*/
        res.json({createRole}); 
    }
    catch(err){
        res.json(err);
    }
  
}

module.exports.deletedeRole= async (req, res) => {
    try{
        let AllTeamOza=await TeamOzalentour.findAll();
        console.log(AllTeamOza);
        res.json({AllTeamOza});
    }
    catch(err){
        res.json(err);
    }

}