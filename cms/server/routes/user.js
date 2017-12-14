const express = require("express");
const router = express.Router();
const data = require("../data");
const structureData = data.structures;
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

router.get("/entry", (req, res) => {
  let slug = xss(req.query.slug);
  let id = xss(req.query.id);
  if (slug) {
    structureData.getEntryByEntrySlug(slug).then(response => {
      res.status(200).json(response);
    });
  } else if (id) {
    structureData.getEntryByEntryID(id).then(response => {
      res.status(200).json(response);
    });
  }
});

module.exports = router;
