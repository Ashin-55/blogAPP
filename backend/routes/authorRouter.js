const router = require("express").Router();
const {
  getMypost,
  authLogin,
  authSignup,
  createPost,
  getAllPost,
  getPostDetail,
  myPostDetails,
  profileData,
  editProfileData,
  getAuthorData,
  likePost,
  deletePost,
  getEditPostData,
  editPost,
  editProfile,
  checkPostLiked
} = require("../controllers/authorController");

router.get("/home/:id", getAllPost);
router.get("/postDetail/:id", getPostDetail);
router.get("/mypost/:authorId", getMypost);
router.get("/mypostDetail/:id", myPostDetails);
router.get("/authordetails/:id",getAuthorData)
router.get("/profile/:id", profileData);
router.get("/editProfile/:id", editProfileData);
router.get("/deletePost/:id",deletePost)
router.get("/editPost/:id",getEditPostData)
router.post("/checkPostLiked",checkPostLiked)

router.post("/editProfile",editProfile)
router.post("/editPost",editPost)
router.post("/authorSignup", authSignup);
router.post("/authorLogin", authLogin);
router.post("/newpost", createPost);
router.post("/likePost",likePost)

module.exports = router;
