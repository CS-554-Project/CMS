const express = require('express');
const router = express.Router();

router.post("/addstructure", (req, res) => {
    console.log(req.body);
});

module.exports = router;