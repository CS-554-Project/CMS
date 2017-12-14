const express = require("express");
const router = express.Router();
const redisConnection = require("../js/redis-connection");
const redis = require("redis");
const client = redis.createClient();
const nrpSender = require("../js/nrp-sender-shim");

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    let response = await nrpSender.sendMessage({
      redis: redisConnection,
      eventName: "add-user",
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
