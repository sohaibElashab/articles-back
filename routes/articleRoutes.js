const express = require("express");
const {
  createArticle,
  fetchArticles,
  fetchArticleById,
  modifyArticle,
  removeArticle,
} = require("../controllers/articleController");
const { protect } = require("../middleware/authMiddleware");

const articleRoutes = (io) => {
  const router = express.Router();

  router.route("/").get(protect, fetchArticles);
  router.route("/").post(protect, async (req, res) => {
    await createArticle(req, res);
    io.emit("articleUpdate");
  });

  router
    .route("/:id")
    .get(protect, fetchArticleById)
    .put(protect, async (req, res) => {
      await modifyArticle(req, res);
      io.emit("articleUpdate");
    })
    .delete(protect, async (req, res) => {
      await removeArticle(req, res);
      io.emit("articleUpdate");
    });

  return router;
};

module.exports = articleRoutes;
