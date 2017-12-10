const express = require('express');
const router = express.Router();
const redisConnection = require('../js/redis-connection');
const redis = require('redis');
const client = redis.createClient();
const nrpSender = require('../js/nrp-sender-shim');
const data = require('../data');
const structureData = data.structures;
const path = require('path');
const multer  = require('multer');


const storageImages = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/images')
  },
  filename: function (req, file, cb) {
    cb(null,  file.originalname)
  }
});

const uploadImage = multer({ storage: storageImages});

const storageFiles = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/files')
  },
  filename: function (req, file, cb) {
    cb(null,  file.originalname)
  }
});

const uploadFile = multer({ storage: storageFiles});

router.post('/addstructure', async (req, res) => {
  try {
    let response = await nrpSender.sendMessage({
      redis: redisConnection,
      eventName: 'add-structure',
      data: {
        structure: req.body
      },
      expectsResponse: true  
    });
    console.log("response" + response);
  } catch(err) {
    console.log("error" + err);
  }
});

router.put("/editstructure", async (req, res) => {
  try {
    let response = await nrpSender.sendMessage({
      redis: redisConnection,
      eventName: 'edit-structure',
      data: {
        structure: req.body
      },
      expectsResponse: true  
    });
    console.log("response" + response);
  } catch(err) {
    console.log("error" + err);
  }
});

router.get("/liststructures", async (req, res) => {
  try {
    let response = await nrpSender.sendMessage({
      redis: redisConnection,
      eventName: 'list-structures',
      expectsResponse: true  
    });
    res.status(200).json(response);
  } catch(err) {
    console.log("error" + err);
  }
});

router.delete("/deletestructure", async (req, res) => {
  try {
    let response = await nrpSender.sendMessage({
      redis: redisConnection,
      eventName: 'delete-structure',
      data: {
        structure: req.body
      },
      expectsResponse: true  
    });
    res.status(200).json(response);
  } catch(err) {
    console.log("error" + err);
  } 
});

router.post("/addentry", async (req, res) => {
  try {
    let response = await nrpSender.sendMessage({
      redis: redisConnection,
      eventName: 'add-entry',
      data: {
        structure: req.body
      },
      expectsResponse: true  
    });
    console.log("response" + response);
  } catch(err) {
    console.log("error" + err);
  }
});

router.get("/liststructures", async (req, res) => {
  try {
    let response = await nrpSender.sendMessage({
      redis: redisConnection,
      eventName: 'list-structures',
      expectsResponse: true  
    });
    res.status(200).json(response);
  } catch(err) {
    console.log("error" + err);
  }
});

router.post("/uploadimage", uploadImage.single('image'),  async (req, res) => {
  console.log("uploadimage", req.file);
});

router.post("/uploadfile", uploadFile.single('image'),  async (req, res) => {
  console.log("uploadimage", req.file);
});

// router.get("/getstructuredetails/:slug", (req, res) => {
//   structureData.getStructureBySlug(req.params.slug).then(response => {
//     res.status(200).json(response);
//   });
// });


module.exports = router;
