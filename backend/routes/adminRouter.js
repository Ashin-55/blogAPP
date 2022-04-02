const router = require("express").Router();
const {
  adminLogin,
  allUsers,
  allPreUsers,
  allAuthors,
  recentPost,
  newUsers,
  activeAuthor,
  premiumCount,
  getAuthorPostDetails,
  deletePost,
  getAuthorDetail
} = require("../controllers/adminController");

const adminProtect = require("../middleware/adminAuthMiddleware");

router.post("/login", adminLogin);
router.get("/allUser", adminProtect, allUsers);
router.get("/allPreUser", adminProtect, allPreUsers);
router.get("/allAuthors", adminProtect, allAuthors);
//dashBorad
router.get("/recentPost", adminProtect, recentPost);
router.get("/newUsers", adminProtect, newUsers);
router.get("/activeAuthor", adminProtect, activeAuthor);
router.get("/premiumCount", adminProtect, premiumCount);
router.get("/getAuthorPostDetails/:id",adminProtect,getAuthorPostDetails)
router.get("/getAuthorData/:id",adminProtect,getAuthorDetail)

router.delete("/postDelete/:id",adminProtect,deletePost)

module.exports = router;
