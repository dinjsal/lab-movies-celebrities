const { reset } = require("nodemon");
const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

// create a celebrity - get, form

router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

// create a celebrity - post

router.post("/celebrities/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((err) => {
      res.render("celebrities/new-celebrity");
      console.log(err);
    });
});

// list all celebrities

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    // sort by creation date
    .sort({ createdAt: -1 })
    // show only the name
    // .select({ name: 1 })
    .then((response) => {
      console.log(response);
      res.render("celebrities/celebrities", { celebrities: response });
    })
    .catch((err) => console.log(err));
});

// populate with "movie" , property from Movie.model
// Bonus iteration: Show celebrity details

router.get("/celebrities/:id", (req, res, next) => {
  Celebrity.findById(req.params.id)
    .populate("movie")
    .then((response) => {
      res.render("celebrities/celebrity-details", { celebrity: response });
    })
    .catch((err) => console.log(err));
});

// Bonus iteration: Edit a celebrity

router.get("/celebrities/:id/edit", (req, res, next) => {
  Celebrity.findByIdAndUpdate(req.params.id)
    .then((response) => {
      res.render("celebrities/edit-celebrity", { celebrity: response });
    })
    .catch((err) => console.log(err));
});

// Bonus iteration: Edit a celebrity

router.post("/celebrities/:id/edit", (req, res, next) => {
  const celebrityId = req.params.id;
  const { name, occupation, catchPhrase } = req.body;
  // findByIdAndUpdate needs 2 arguments (which movie you want changed, which info do you want changed)
  // PLUS A 3RD ARGUMENT: {new: true}. Otherwise data won't get updated
  Celebrity.findByIdAndUpdate(
    celebrityId,
    { name, occupation, catchPhrase },
    {
      new: true,
    }
  )
    .then((response) => {
      console.log(response);
      res.redirect(`/celebrities/${celebrityId}`);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Bonus iteration: Delete a celebrity

router.post("/celebrities/:id/delete", (req, res, next) => {
  const celebrityId = req.params.id;
  Celebrity.findByIdAndDelete(celebrityId)
    .then(() => res.redirect("/celebrities"))
    .catch((error) => next(error));
});

module.exports = router;
