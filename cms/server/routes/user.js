const express = require("express");
const router = express.Router();
const redisConnection = require("../js/redis-connection");
const redis = require("redis");
const client = redis.createClient();
const nrpSender = require("../js/nrp-sender-shim");
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

  if (slug) {
    client.exists(slug, (error, isExist) => {
      if (!isExist) {
        structureData.getEntryByEntrySlug(slug).then(response => {
          client.set(slug, JSON.stringify(response));
          res.status(200).json(response);
        });
      } else {
        client.get(slug, (error, data) => {
          res.status(200).json(JSON.parse(data));
        });
      }
    });
    // structureData.getEntryByEntrySlug(slug).then(response => {
    //   responseJSON = response;
    //   responseEntrySlug = slug;
    //   res.status(200).json(response);
    // });
  } else if (id) {
    structureData.getEntryByEntryID(id).then(response => {
      responseJSON = response;
      res.status(200).json(response);
    });
  }
});

router.post("/addcomment", async (req, res) => {
  try {
    let response = await nrpSender.sendMessage({
      redis: redisConnection,
      eventName: "add-comment",
      data: {
        entry: req.body
      },
      expectsResponse: true
    });
    client.del(req.body.slug).then(() => {
      res.json(response);
    });
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;
