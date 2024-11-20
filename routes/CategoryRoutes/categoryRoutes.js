const {
  handleCreateCategory,
  handleGetAllCategories,
} = require("../../controller/CategoryController/category_controller");
const express = require("express");
const router = require("express").Router();
const uploads = require("../../MulterConfig/multerconfig");

// Use static files from the Uploads directory
router.use("/img", express.static("uploads/img"));
// Create Categories
router.post("/createCategory", uploads.single("catImg"), handleCreateCategory);

// Get All Categories
router.get("/getAllCategories", handleGetAllCategories);

module.exports = router;
