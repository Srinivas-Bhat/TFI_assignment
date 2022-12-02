const { Router } = require("express");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const AuthModel = require("../Models/auth.model");
const { token } = require("morgan");

const authRouter = Router();

authRouter.get("/login", (req, res, next) => {
  res.send("login get");
});

authRouter.get("/signup", (req, res, next) => {
  // const {name, email, role, password} = req.body;
  // res.send(name, email, password, role)
});

authRouter.post("/login", async(req, res, next) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await AuthModel.findOne({ email });
    if(!user) {
      return res.status(404).send({message: "User not found", error: "notfound"})
    }
    const verification = await argon2.verify(user.password, password);
    if(verification) {
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        "SECRET123",
      )
      return res.send({
        message: "Logging in Successfull",
        token : token,
        role: user.role,
        id: user._id
      })
    }
    else if(!verification) {
      return res.status(401).send({message : "Please verify your email and password", error : "perror"});
    }
    else {
      return res.status(500).send({message : "Something went wrong", error: "error"});
    }
  } catch (err) {
    console.log(err);
  }
});

authRouter.post("/signup", async (req, res) => {
  // console.log(req.body);
  let { name, email, role, password } = req.body;

  const hash = await argon2.hash(password);

  const user = new AuthModel({ name, email, role, password: hash });
  console.log(user);
  await user.save((err, succ) => {
    if (err) {
      res.status(401).send({message: "something went wrong", error : err, code : "401"});
    } else {
      res.status(201).send({ message: "Signup Successfull", user: user });
    }
  });
});

authRouter.get("/logout", (req, res, next) => {
  res.send("logout");
});

module.exports = authRouter;
