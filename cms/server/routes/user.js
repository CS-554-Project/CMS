const express = require("express");
const router = express.Router();
const data = require("../data");
const structureData = data.structures;
const search = data.search;
const xss = require("xss");
const imagemagick = require("imagemagick");

router.get("/structures", (req, res) => {
  structureData.getAllStructures().then(response => {
    res.status(200).json(response);
  });
});

router.get("/entries", (req, res) => {
  let slug = xss(req.query.slug);
  structureData.getStructureBySlug(slug).then(response => {
    res.status(200).json(response);
  });
});

router.get("/search", (req, res) => {
  let search = xss(req.query.search);
  structureData.search(search).then(response => {
    res.status(200).json(response);
  });
});

router.get("/entry", (req, res) => {
  let slug = xss(req.query.slug);
  let id = xss(req.query.id);
  let responseJSON = null;
  let responseStructureSlug = null;
  let responseEntrySlug = null;
  if (slug) {
    structureData.getEntryByEntrySlug(slug).then(response => {
      responseJSON = response;
      responseEntrySlug = slug;
      res.status(200).json(response);
    });
  } else if (id) {
    structureData.getEntryByEntryID(id).then(response => {
      responseJSON = response;
      res.status(200).json(response);
    });
  }
});

module.exports = router;
