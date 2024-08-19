const express = require("express");
const router = express.Router();
const {
  indexActivities,
  addActivity,
  myActivities,
  updateMyActivities,
  showIdActivities,
  /*findActivities,
  activityProxyUser,*/
} = require("../controllers/activity/activities");

router.post("/", indexActivities);
router.post("/addmyactivities", addActivity);
router.post("/myactivities", myActivities);
router.post("/updateMyActivities", updateMyActivities);
router.post("/showIdActivities", showIdActivities);
/*router.post("/findactivities", findActivities);*/
/*router.post("/proximity", activityProxyUser);*/

module.exports = router;
