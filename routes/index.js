const { reset } = require("nodemon");

const router = require("express").Router();

//Iteration 1: linking celebritiies.routes.js and movies.routes.js

const celebritiesRoute = require("./celebrities.routes");
const moviesRoute = require("./movies.routes");

router.use(celebritiesRoute);
router.use(moviesRoute);

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

//router for each hbs file, celebrities and movies folders
// new-celebrity.hbs

// new-movie.hbs

// movie-details.hbs

// edit-movie.hbs

module.exports = router;
