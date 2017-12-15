const express = require("express");
const router = express.Router();
const redisConnection = require("../js/redis-connection");
const redis = require("redis");
const client = redis.createClient();
const nrpSender = require("../js/nrp-sender-shim");
const data = require("../data");
const structureData = data.structures;
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const zip = new require("node-zip")();
const elasticSearch = require("../data/elasticsearch");
const xss = require("xss");
const imagemagick = require("../data/imagemagick");
const bluebird = require("bluebird");
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const storageImages = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/images");
  },
  filename: function(req, file, cb) {
    cb(null, xss(file.originalname));
  }
});

const uploadImage = multer({ storage: storageImages });

const storageFiles = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/files");
  },
  filename: function(req, file, cb) {
    cb(null, xss(file.originalname));
  }
});

const uploadFile = multer({ storage: storageFiles });

router.post("/addstructure", async (req, res) => {
  try {
    let response = await nrpSender.sendMessage({
      redis: redisConnection,
      eventName: "add-structure",
      data: {
        structure: req.body
      },
      expectsResponse: true
    });
    res.json(response);
  } catch (err) {
    res.json({ error: err });
  }
});

router.put("/editstructure", async (req, res) => {
  try {
    let response = await nrpSender.sendMessage({
      redis: redisConnection,
      eventName: "edit-structure",
      data: {
        structure: req.body
      },
      expectsResponse: true
    });
    res.json(response);
  } catch (err) {
    res.json({ error: err });
  }
});

router.get("/liststructures", async (req, res) => {
  try {
    let response = await nrpSender.sendMessage({
      redis: redisConnection,
      eventName: "list-structures",
      expectsResponse: true
    });
    res.json(response);
  } catch (err) {
    res.json({ error: err });
  }
});

router.delete("/deletestructure", async (req, res) => {
  try {
    let response = await nrpSender.sendMessage({
      redis: redisConnection,
      eventName: "delete-structure",
      data: {
        structure: req.body
      },
      expectsResponse: true
    });
    res.json(response);
  } catch (err) {
    res.json({ error: err });
  }
});

router.post("/addentry", async (req, res) => {
  try {
    let response = await nrpSender.sendMessage({
      redis: redisConnection,
      eventName: "add-entry",
      data: {
        structure: req.body
      },
      expectsResponse: true
    });
    elasticSearch
      .addEntryToIndex(
        xss(req.body.structureslug),
        xss(req.body.title),
        xss(req.body.slug),
        xss(req.body.blurb)
      )
      .then(done => {
        res.json(response);
      });
  } catch (err) {
    res.json({ error: err });
  }
});

router.post("/updateentry", async (req, res) => {
  try {
    let response = await nrpSender.sendMessage({
      redis: redisConnection,
      eventName: "update-entry",
      data: {
        entry: req.body
      },
      expectsResponse: true
    });

    await client.del(req.body.slug);

    elasticSearch.deleteEntry(xss(req.body.slug)).then(() => {
      elasticSearch
      .addEntryToIndex(
        xss(req.body.structureslug),
        xss(req.body.title),
        xss(req.body.slug),
        xss(req.body.blurb)
      )
      .then(done => {

        res.json(response);
      });
    });
  } catch (err) {
    res.json({ error: err });
  }
});

router.get("/:slug/listentries", async (req, res) => {
  try {
    let response = await nrpSender.sendMessage({
      redis: redisConnection,
      eventName: "list-entries-by-slug",
      data: {
        structure: req.params
      },
      expectsResponse: true
    });
    res.json(response);
  } catch (err) {
    res.json({ error: err });
  }
});

router.delete("/deleteentry", async (req, res) => {
  try {
    let response = await nrpSender.sendMessage({
      redis: redisConnection,
      eventName: "delete-entry",
      data: {
        entry: req.body
      },
      expectsResponse: true
    });
    elasticSearch.deleteEntry(xss(req.body.slug)).then(done => {
      res.json(response);
    });
  } catch (err) {
    res.json({ error: err });
  }
});

router.post("/uploadimage", uploadImage.single('image'), async (req, res) => {
  res.json('Image Uploaded'); 
});

router.post("/resizeimage", async (req, res) => {
  imagemagick.convertImageToThumbnail(req.body.image, (response) => {
    res.json('Image Resized');
  });
});

router.post("/uploadfile", uploadFile.single("file"), async (req, res) => {
  zip.file(
    xss(req.file.filename),
    fs.readFileSync(
      path.join(__dirname, "../uploads/files/", req.file.filename)
    )
  );
  let data = zip.generate({ base64: false, compression: "DEFLATE" });
  let fileName = path.parse(xss(req.file.filename)).name;
  fs.writeFileSync(
    path.join(__dirname, "../uploads/files/", fileName.concat(".zip")),
    data,
    "binary"
  );
});

router.get("/listallstructures", async (req, res) => {
  try {
    let response = await nrpSender.sendMessage({
      redis: redisConnection,
      eventName: "list-all-structures",
      expectsResponse: true
    });
    res.json(response);
  } catch (err) {
    res.json({ error: err });
  }
});

router.get("/listusers", async (req, res) => {
  try {
    let response = await nrpSender.sendMessage({
      redis: redisConnection,
      eventName: "list-users",
      expectsResponse: true
    });
    res.json(response);
  } catch (err) {
    res.json({ error: err });
  }
});

router.put("/updateuser", async (req, res) => {
  try {
    let response = await nrpSender.sendMessage({
      redis: redisConnection,
      eventName: "update-user",
      data: {
        user: req.body
      },
      expectsResponse: true
    });
    res.json(response);
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;
