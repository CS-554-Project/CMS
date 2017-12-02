const express = require('express');
const router = express.Router();
const data = require("../data");
const structureData = data.structures;

router.get("/structures", (req, res) => {
    structureData.getAllStructures().then((response) => {
        res.status(200).json(response);
    });
});

router.get("/entries", (req, res) => {
    console.log(req.params.slug);
    structureData.getStructureBySlug("slug").then((response) => {
        console.log(response);
        res.status(200).json(response);
    });
});


module.exports = router;