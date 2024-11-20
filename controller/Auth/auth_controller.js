const User = require("../../Model/Auth/userModel");

// Handle User Registration
async function handleUserRegistration(req, res) {
  const { name, email, password, gender } = req.body;

  if (!name || !email || !password || !gender) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }
  const userModel = new User({
    name,
    email,
    password,
    gender,
  });
  const result = await userModel.save();
  return res.status(200).json({
    Status: true,
    Success: "Account Created Successfully",
    data: result,
  });
}

// handle User Login
async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({ message: "User Not Exist" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = await user.generateAuthToken();

    console.log(token);

    // return The Response To The Client
    return res.status(200).json({
      Status: true,
      Success: "Login Successfully",
      data: user,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ error: `${error.message}` });
  }
}

module.exports = { handleUserRegistration, handleUserLogin };
