const router = require("express").Router();
const articleController = require("../../controllers/articlesController");



router.route("/")
.get(articleController.getArticles)
.post(articleController.create);
router.route("/saved")
.get(articleController.findAll);
router.route("/:id")
.delete(articleController.remove);


// Matches with "/api/articles"
/* router.route("/")
  .get(articleController.findAll)
  .post(articleController.create)
  .delete(articleController.remove); */

/* // Matches with "/api/books/:id"
router
  .route("/:id")
  .get(booksController.findById)
  .put(booksController.update)
  .delete(booksController.remove); */

module.exports = router;
