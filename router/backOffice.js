const express = require("express");
const router = express.Router();
const { iDepartment,cDepartment } = require("../controllers/backOffice/department");
const { indexOzaTeam,addUserOza,login,PIOzaTeam,oneOzaTeam,AllOzaTeamByTeam,IRole,ChaneMRoleOza,myUser,myUserRole,soldeTotalOzp,indexUser,DeletedUser } = require("../controllers/backOffice/teamOzalentour");
const { createRole } = require("../controllers/backOffice/role");

router.post("/ozaTeam",indexOzaTeam);
router.post("/add",addUserOza);
router.post("/login",login);
router.get("/pending",PIOzaTeam);
router.post("/oneOzaTeam",oneOzaTeam);
router.post("/AllOzaTeamByTeam",AllOzaTeamByTeam);
router.get("/iProfile",IRole);
router.post("/ChaneMRoleOza",ChaneMRoleOza);
router.post("/test",myUser);
router.post("/testrole",myUserRole)
router.get("/iDepartment", iDepartment);
router.post("/createDepartment",cDepartment);
router.post("/createRole",createRole);
router.get("/tt-ozp", soldeTotalOzp);
router.get("/user", indexUser);
router.post("/del", DeletedUser);
/* router.get("/", createStripe);
router.post("/", checkoutStripe); */



module.exports = router;