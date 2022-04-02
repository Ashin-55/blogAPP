const asynHandler = require("express-async-handler");
const Admin = require("../model/adminModel");
const User = require("../model/userModel");
const Author = require("../model/authorModel");
const Post = require("../model/postModel");
const generateToken = require("../utils/generateToken");

const adminLogin = asynHandler(async (req, res) => {
  const { email, password } = req.body;

  let admin = await Admin.find();
  if (!email || !password) {
    console.log("email and password not provided");
    res.status(400).json({ message: "Please fill all field" });
  } else {
    if (admin && admin[0].password == password) {
      console.log("admin login success");
      res.status(200).json({
        message: "Login Success",
        status: "ok",
        token: generateToken(admin[0]),
      });
    } else {
      console.log("Login fail");
      res.status(400).json({ message: "invalid email or password" });
    }
  }
});
const allUsers = asynHandler(async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    console.log("the error is =>", error);
    res.status(400);
    throw new Error(error);
  }
});
const allPreUsers = asynHandler(async (req, res) => {
  try {
    const preUser = await User.find({ premiumUser: true });
    res.status(200).json(preUser);
  } catch (error) {
    console.log("the error is =>", error);
    res.status(400);
    throw new Error(error);
  }
});
const allAuthors = asynHandler(async (req, res) => {
  try {
    let data = await Post.aggregate([
      {
        $group: {
          _id: "$authorId",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "authorColletion",
          localField: "_id",
          foreignField: "_id",
          as: "authorData",
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    console.log("the error is =>", error);
    res.status(400);
    throw new Error(error);
  }
});

const recentPost = asynHandler(async (req, res) => {
  console.log("recent post");
  try {
    const data = await Post.find()
      .populate("authorId")
      .sort({ createdAt: -1 })
      .limit(5);
    res.status(200).json({ post: data });
  } catch (error) {
    console.log("error is come =>", error);
    res.status(400);
    throw new Error(error);
  }
});
const newUsers = asynHandler(async (req, res) => {
  console.log("new Users");

  try {
    const data = await User.find().sort({ createdAt: -1 }).limit(4);
    res.status(200).json({ message: data });
  } catch (error) {
    console.log("the error was =>", error);
    res.status(400);
    throw new Error(error);
  }
});
const activeAuthor = asynHandler(async (req, res) => {
  console.log("active author");

  try {
    let data = await Post.aggregate([
      {
        $group: {
          _id: "$authorId",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "authorColletion",
          localField: "_id",
          foreignField: "_id",
          as: "authorData",
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 1,
      },
    ]);

    res.status(200).json({ message: data });
  } catch (error) {
    console.log("the error is =>", error);
    res.status(400);
    throw new Error(error);
  }
});
const premiumCount = asynHandler(async (req, res) => {
  console.log("premium count");

  try {
    const premiumUser = await User.find({ premiumUser: true }).count();
    const normalUser = await User.find({ premiumUser: false }).count();
    res.status(200).json({ premiumUser, normalUser });
  } catch (error) {
    console.log("the error is =>", error);
    res.status(400);
    throw new Error(error);
  }
});

const getAuthorPostDetails = asynHandler(async (req, res) => {
  try {
    const details = await Post.find({ authorId: req.params.id });
    res.status(200).json({ message: details });
  } catch (error) {
    console.log("the error is ", error);
    res.status(400).json({ message: "failed to fetch data", error: error });
  }
});
const deletePost = (req, res) => {
  try {
    Post.findByIdAndDelete(req.params.id)
      .then((response) => {
        res.status(200).json({ message: "Post Deleted" });
      })
      .catch((err) => {
        console.log("the error is ", error);
        res.status(400).json({ message: "post delete failed", error: error });
      });
  } catch (error) {
    console.log("the error is ", error);
    res.status(400).json({ message: "something wrong", error: error });
  }
};
const getAuthorDetail = asynHandler(async(req,res)=>{
  try {
    const data = await Author.findById(req.params.id)
    res.status(200).json(data)
  } catch (error) {
    console.log("the error is ",error)
    res.status(400).json({message:"failed"})
    throw new Error(error)
  }
})
module.exports = {
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
};
