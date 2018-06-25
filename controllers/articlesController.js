const db = require("../models");
const axios = require("axios");
const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

// Defining methods for the ArticlesController
module.exports = {
  findAll: function(req, res) {
    db.Article
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Article
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Article
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getArticles: function(req,res){
    axios
    .get(BASEURL,{ params: req.query})
    .then(({ data: { response } }) => {
      res.json(response)
    })
    .catch(err => res.status(422).json(err));

  }

};
