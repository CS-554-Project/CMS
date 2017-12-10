const express = require('express');
const router = express.Router();
const redisConnection = require('../js/redis-connection');
const redis = require('redis');
const client = redis.createClient();
const nrpSender = require('../js/nrp-sender-shim');
const data = require('../data');
const structureData = data.structures;
const fs = require('fs');
const path = require('path');
const multer  = require('multer');
const zip = new require('node-zip')();
const elasticSearch = require('../data/elasticsearch');

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
    let output = undefined;

    console.log("response" + response);

    // elasticSearch.addEntryToIndex(req.body.structureslug, req.body.title, req.body.slug, req.body.blurb).then((output1) => {
    //   console.log("addEntryToIndex", output1);

    //   setTimeout(function() {
    //     console.log('Blah blah blah blah extra-blah');

    //     elasticSearch.countIndex().then((output2) => {
    //       console.log("countIndex", output2);
    //       elasticSearch.searchIndex('temp1').then((output3) => {
    //         console.log("searchIndex", output3.hits);
    //         res.json(output3.hits);
    //       });
    //     });
    //   }, 5000);
    // });
    
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
  console.log("Image Uploaded");
});

router.post("/uploadfile", uploadFile.single('file'),  async (req, res) => {
  zip.file(req.file.filename, fs.readFileSync(path.join(__dirname, '../uploads/files/',  req.file.filename)));  
  let data = zip.generate({ base64:false, compression: 'DEFLATE' });  
  let fileName = path.parse(req.file.filename).name;
  fs.writeFileSync(path.join(__dirname, '../uploads/files/',  fileName.concat('.zip')), data, 'binary');
  console.log("File Zipped");
});

router.get("/listallstructures", async (req, res) => {
    try {
      let response = await nrpSender.sendMessage({
        redis: redisConnection,
        eventName: 'list-all-structures',
        expectsResponse: true
      });
      res.status(200).json(response);
    } catch(err) {
      console.log("error" + err);
    }
});

// router.get("/getstructuredetails/:slug", (req, res) => {
//   structureData.getStructureBySlug(req.params.slug).then(response => {
//     res.status(200).json(response);
//   });
// });


module.exports = router;
