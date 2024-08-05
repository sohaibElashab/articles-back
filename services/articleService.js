const Article = require("../models/Article");
const User = require("../models/User");
const natural = require("natural");

// Function to split content into sentences
const splitContent = (content) => {
  return content.split(/(?<=[.!?])\s+/);
};

// Function to check for similar articles
const compareArticles = async (newContent) => {
  const newSentences = splitContent(newContent);
  const articles = await Article.find();

  for (const article of articles) {
    const existingSentences = splitContent(article.text);
    let similarCount = 0;

    for (const newSentence of newSentences) {
      for (const existingSentence of existingSentences) {
        const distance = natural.JaroWinklerDistance(
          newSentence,
          existingSentence
        );
        if (distance > 0.8) {
          similarCount++;
        }
      }
    }

    // If more than 20% of the sentences are similar, consider it a duplicate
    if (similarCount / newSentences.length > 0.2) {
      return true;
    }
  }
  return false;
};

const addArticle = async (articleData) => {
  const isDuplicate = await compareArticles(articleData.text);
  const article = new Article({ ...articleData, isDuplicate });
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
  const isDuplicate = await compareArticles(updateData);
  return Article.findByIdAndUpdate(
    id,
    { ...updateData, isDuplicate },
    { new: true }
  );
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
