import express from "express";
import cookieParser from "cookie-parser";
import userModel from "./models/user.js"
import  postModel  from "./models/post.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");



app.get("/", (req, res) => {
  res.render("index");
});


app.get("/profile", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email }).populate({ path: "posts", model: "Post" });
  res.render("profile", { user });
});


app.post("/post", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  let { content } = req.body;

  let post = await postModel.create({
    user: user._id,
    content,
  });

  user.posts.push(post._id);
  await user.save();
  res.redirect("/profile");
});


app.get("/like/:id", isLoggedIn, async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id }).populate("user");
  if(post.likes.indexOf(req.user.userid) === -1) 
  {
    post.likes.push(req.user.userid);
  }
  else
  {
    post.likes.splice(post.likes.indexOf(req.user.userid),1)
  }
  await post.save();
  res.redirect("/profile",);
});



app.get("/edit/:id", isLoggedIn, async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id }).populate("user");
  
  res.render("edit",{post});
});



app.post("/update/:id", isLoggedIn, async (req, res) => {
  await postModel.findOneAndUpdate({ _id: req.params.id }, { content: req.body.content });
  res.redirect("/profile");
});


app.get("/delete/:id", isLoggedIn, async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id }).populate("user");
  if (post.user._id.toString() === req.user.userid) {
    await postModel.findOneAndDelete({ _id: req.params.id });
    let user = await userModel.findOne({ _id: req.user.userid });
    user.posts.splice(user.posts.indexOf(req.params.id), 1);
    await user.save();
  }
  res.redirect("/profile");
});



app.get("/login", (req, res) => {
  res.render("login");
});



app.post("/register", async(req, res) => {
  let {username,email,password,age} = req.body;
  let user =await userModel.findOne({email})
  if(user) return res.render("index", { message: "User already exists. Please login instead." });

  bcrypt.genSalt(10,(err,salt) => {
    bcrypt.hash(password,salt, async(err,hash) => {
      let user = await userModel.create({
        username,
        email,
        password:hash,
        age,
      })

      let token =  jwt.sign({email:email , userid : user._id},"shhhh");
      res.cookie("token",token);
      res.redirect("/profile");
    })
  })
});



app.post("/login", async(req, res) => {
  let {email,password} = req.body;
  let user =await userModel.findOne({email})
  if(!user) return res.status(500).send("Somehting went wrong");

  bcrypt.compare(password,user.password,(err,result) => {
    if(result) {
      let token =  jwt.sign({email:email , userid : user._id},"shhhh");
  res.cookie("token",token);
  res.redirect("/profile");
    }
    else res.redirect("/login")
  })  
});



function isLoggedIn(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect("/login");
  }
  try {
    const data = jwt.verify(token, "shhhh");
    req.user = data;
    next();
  } catch (err) {
    return res.redirect("/login");
  }
}



app.get("/logout", (req, res) => {
  res.cookie("token","")
  res.redirect("login");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
