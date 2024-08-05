const Article = require("../models/Article");
const User = require("../models/User");

const addArticle = async (articleData) => {
  const article = new Article(articleData);
  await article.save();
  return article;
};

const getArticles = async (req) => {
  const user = await User.findById(req.user.id);
  return user.role === "publisher"
    ? await Article.find({
        $or: [{ privacy: "public" }, { publisher: user.name }],
      }).sort({ date: -1 })
    : await Article.find({ publisher: user.name }).sort({ date: -1 });
};

const getArticleById = async (id) => {
  return Article.findById(id);
};

const updateArticle = async (id, updateData) => {
  return Article.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteArticle = async (id) => {
  return Article.findByIdAndDelete(id);
};

module.exports = {
  addArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
};
