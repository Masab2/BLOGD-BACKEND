const {
  handleCreateBlog,
  handleGetAllBlogs,
  handleGetAllNotifications,
  handleGetBlogById,
} = require("../../controller/BlogController/blog_controller");

const router = require("express").Router();

// Create Blogs Post Request
router.post("/createBlog", handleCreateBlog);

// Get All Blogs Get Request
router.get("/getAllBlogs", handleGetAllBlogs);

// get all notifications
router.get("/getUserNotifications", handleGetAllNotifications);

// Get The Blog By Id
router.get("/getBlogById", handleGetBlogById);
module.exports = router;
