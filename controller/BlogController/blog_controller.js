const Blog = require("../../Model/CreateBlog/create_blog_model");
const notification = require("../../Model/NotificationModel/notification_model");

// Create Blog
async function handleCreateBlog(req, res) {
  const { title, description, author, userId, category, estimatedTime } =
    req.body;
  try {
    if (
      !title ||
      !description ||
      !author ||
      !userId ||
      !category ||
      !estimatedTime
    ) {
      return res.status(400).json({ error: "All fields are required" });
    } else {
      const blog = new Blog({
        title,
        description,
        author,
        userId,
        category,
        estimatedTime,
      });
      const result = await blog.save();
      // Add notification
      const notificationData = new notification({
        title: "New Blog Post",
        notificationTitle: `New Blog Created By ${author}`,
        userId: userId,
        blogId: result._id,
      });
      await notificationData.save();
      return res.status(200).json({
        Status: true,
        Success: result,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: `${error}` });
  }
}

// Get all the Blogs
async function handleGetAllBlogs(req, res) {
  try {
    const blogs = await Blog.find();
    return res.status(200).json({
      Status: true,
      Success: blogs,
    });
  } catch (error) {
    return res.status(500).json({ error: `${error}` });
  }
}

// Get All Notifications for the User
async function handleGetAllNotifications(req, res) {
  const { userId } = req.query;
  console.log("UserId: ", userId);
  try {
    const notifications = await notification.find({ userId: userId });
    return res.status(200).json({
      Status: true,
      Success: notifications,
    });
  } catch (error) {
    return res.status(500).json({ error: `${error}` });
  }
}

// Get The Blog By Id
async function handleGetBlogById(req, res) {
  const { blogId } = req.query;
  try {
    const blog = await Blog.findById(blogId);
    return res.status(200).json({
      Status: true,
      Success: blog,
    });
  } catch (error) {
    return res.status(500).json({ error: `${error}` });
  }
}

module.exports = {
  handleCreateBlog,
  handleGetAllBlogs,
  handleGetAllNotifications,
  handleGetBlogById,
};
