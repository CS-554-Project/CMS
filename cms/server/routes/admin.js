const express = require("express");
const router = express.Router();
const data = require("../data");
const structureData = data.structures;

router.post("/addstructure", (req, res) => {
  structureData
    .addStructure(
      req.body.name,
      req.body.slug,
      req.body.description,
      req.body.pagesize,
      req.body.fields
    )
    .then(response => {
      res.status(200).json(response);
    });
});

router.get("/liststructures", (req, res) => {
  structureData.getAllStructures().then(response => {
    res.status(200).json(response);
  });
});

router.put("/editstructure", (req, res) => {
  structureData
    .editStructure(
      req.body.name,
      req.body.slug,
      req.body.description,
      req.body.pagesize,
      req.body.fields
    )
    .then(response => {
      res.status(200).json(response);
    });
});

router.delete("/deletestructure", (req, res) => {
  structureData.deleteStructure(req.body.slug).then(response => {
    res.status(200).json(response);
  });
});

router.get("/getstructuredetails/:slug", (req, res) => {
  structureData.getStructureBySlug(req.params.slug).then(response => {
    res.status(200).json(response);
  });
});

router.post("/addstructureentry", (req, res) => {

    console.log(req.body);
    // structureData.addStructureEntries(req.body.structureslug, req.body.title, req.body.slug, req.body.blurb, req.body.author, req.body.createdDate, req.body.fields).then((response) => {
    //     res.status(200).json(response);
    // });
});

module.exports = router;
