const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {

  const token = req.decodedToken;
  
  if(!token) {
    return res.status(401).json("Token missing or invalid")
  }
  
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });
  res.status(200).json(users);
});

router.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  if (password.length <= 3) {
    return res
      .status(400)
      .json({error: "Password must be more than 3 characters in length"});
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await newUser.save();
  res.status(201).json(savedUser);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await User.findByIdAndDelete(id);
  res.status(204).json({ message: "User succesfully deleted" }).end();
})
  

module.exports = router;
