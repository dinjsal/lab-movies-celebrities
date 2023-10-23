const { reset } = require("nodemon");
const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

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

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((response) => {
      console.log(response);
      res.render("celebrities/celebrities", { celebrities: response });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
