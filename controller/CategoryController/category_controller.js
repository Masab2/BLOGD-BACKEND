const category = require("../../Model/CategoryModel/categoryModel");

// Create Categories
async function handleCreateCategory(req, res) {
  try {
    const { name } = req.body;
    const image = req.file.filename;
    console.log(req.body);
    if (!name || !image)
      return res.status(400).json({ error: "All fields are required" });
    const newCategory = new category({
      name,
      image,
    });
    const result = await newCategory.save();
    return res.status(200).json({ Status: "Success", data: result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Get All The Categories
async function handleGetAllCategories(req, res) {
  try {
    const categories = await category.find();
    return res.status(200).json({ Status: "Success", data: categories });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = { handleCreateCategory, handleGetAllCategories };
