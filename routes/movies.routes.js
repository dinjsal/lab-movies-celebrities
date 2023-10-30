// Iteration 6

const { reset } = require("nodemon");
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");
const { response } = require("express");

// all your routes here

// Iteration 6

router.get("/movies/create", (req, res, next) => {
  Celebrity.find() //should be Celebrity not Movie
    .then((response) => {
      res.render("movies/new-movie", { celebrities: response });
    })
    .catch((err) => console.log(err));
});

// Iteration 6

router.post("/movies/create", (req, res, next) => {
  const newMovie = req.body;
  Movie.create(newMovie)
    .then((response) => {
      // you can concatenate .then's
      return Celebrity.findByIdAndUpdate(req.body.cast, {
        $push: { movies: response._id },
      }); //cast - name in the select tag & Celebrity model
    })
    .then((response) => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log(err);
      res.render("movies/new-movie");
    });
});

// Iteration 7

router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((response) => {
      console.log(response);
      res.render("movies/movies", { movies: response });
    })
    .catch((err) => console.log(err));
});

// Iteration 8 //

router.get("/movies/:id", (req, res, next) => {
  const movieId = req.params.id;
  Movie.findById(movieId)
    .populate("cast")
    .then((response) => {
      console.log(response);
      res.render("movies/movie-details", { movies: response });
    })
    .catch((err) => console.log(err));
});

// Iteration 9

router.post("/movies/:id/delete", (req, res, next) => {
  const movieId = req.params.id;
  Movie.findByIdAndDelete(movieId)
    .then(() => res.redirect("/movies"))
    .catch((error) => next(error));
});

// Iteration 10

router.get("/movies/:id/edit", async (req, res) => {
  const movies = await Movie.findById(req.params.id);
  const allCelebs = await Celebrity.find();
  const copyCelebs = JSON.parse(JSON.stringify(allCelebs));
  const selectedCast = copyCelebs.map((celeb) => {
    if (movies.cast.includes(celeb._id)) {
      celeb.selected = "selected";
    } else {
      celeb.selected = "";
    }
    return celeb;
  });
  console.log("selected cast", selectedCast);
  res.render("movies/edit-movie", { movies, selectedCast });
});

router.post("/movies/:id/edit", (req, res, next) => {
  const movieId = req.params.id;
  // findByIdAndUpdate needs 2 arguments (which movie you want changed, which info do you want changed)
  // PLUS A 3RD ARGUMENT: {new: true}. Otherwise data won't get updated
  Movie.findByIdAndUpdate(movieId, req.body, {
    new: true,
  })
    .then((response) => {
      console.log(response);
      res.redirect(`/movies/${movieId}`);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
