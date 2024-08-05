const {
  addArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} = require("../services/articleService");

const createArticle = async (req, res, next) => {
  try {
    const article = await addArticle(req.body);
    res.status(201).json(article);
  } catch (error) {
    next(error);
  }
};

const fetchArticles = async (req, res, next) => {
  try {
    const articles = await getArticles(req);
    res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
};

const fetchArticleById = async (req, res, next) => {
  try {
    const article = await getArticleById(req.params.id);
    if (article) {
      res.status(200).json(article);
    } else {
      res.status(404).json({ message: "Article not found" });
    }
  } catch (error) {
    next(error);
  }
};

const modifyArticle = async (req, res, next) => {
  try {
    const article = await updateArticle(req.params.id, req.body);
    if (article) {
      res.status(200).json(article);
    } else {
      res.status(404).json({ message: "Article not found" });
    }
  } catch (error) {
    next(error);
  }
};

const removeArticle = async (req, res, next) => {
  try {
    const article = await getArticleById(req.params.id);
    if (article.publisher !== req.user.name) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const deletedArticle = await deleteArticle(req.params.id);
    if (deletedArticle) {
      res.status(200).json({ message: "Article removed" });
    } else {
      res.status(404).json({ message: "Article not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createArticle,
  fetchArticles,
  fetchArticleById,
  modifyArticle,
  removeArticle,
};
