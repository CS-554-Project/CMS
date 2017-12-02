const express = require('express');
const router = express.Router();
const data = require("../data");
const structureData = data.structures;

router.post("/addstructure", (req, res) => {
    
});

router.get("/liststructures", (req, res) => {
    structureData.getAllStructures().then((structures) => {
        res.json(structures);
    }).catch((error) => {
        // Not found!
        res.status(404).json({message: "Recipe not found"});
    });
    
});

module.exports = router;