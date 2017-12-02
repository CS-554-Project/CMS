const express = require('express');
const router = express.Router();
const data = require("../data");
const structureData = data.structures;

router.post("/addstructure", (req, res) => {
    structureData.addStructure(req.body.name, req.body.slug, req.body.description, req.body.pagesize, req.body.fields).then((response) => {
        res.status(200).json(response);
    });
});

router.get("/liststructures", (req, res) => {
    structureData.getAllStructures().then((response) => {
        res.status(200).json(response);
    });
});

router.delete("/deletestructure", (req, res) => {
    structureData.deleteStructure(req.body.slug).then((response) => {
        res.status(200).json(response);
    });
});

module.exports = router;