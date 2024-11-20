const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// It will Call Automaitcally before the Data is Saved to the Database
userSchema.pre("save", async function (next) {
  var user = this;
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(user.password, salt);
  user.password = hashPass;
});

// Compare Password
userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

// Generate the JWT Token
userSchema.methods.generateAuthToken = async function () {
  const token = await jwt.sign(
    { _id: this._id, email: this.email },
    "SECRET_KEY"
  );
  return token;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
