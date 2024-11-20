require("dotenv").config();
const express = require("express");
const body_parser = require("body-parser");
const { connectToDb } = require("./connection/connection");
const authroutes = require('./routes/AuthRoutes/auth_routes')
const blogroutes = require('./routes/BlogsRoutes/blog_route')
const categoryRoutes = require('./routes/CategoryRoutes/categoryRoutes')
const path = require("path")
const app = express();
const PORT = process.env.PORT || 8000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(body_parser.json());
app.use('/user',authroutes)
app.use('/api',blogroutes)
app.use('/api',categoryRoutes)
app.use("/img", express.static(path.join(__dirname, "uploads/img")));


// Connect To Mongo DB
connectToDb(process.env.MONGO_URL)
  .then(() => {
    console.log(`Connected To Mongo Db ${PORT}`);
  })
  .catch(() => {
    console.log(`Failed to connect to MongoDB ${PORT}`);
  });

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });