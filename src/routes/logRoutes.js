const express = require("express");
const Log = require("../models/logModel");
const authMiddleware = require('../middleware/authMiddleware.js');
const roleMiddleware = require('../middleware/rbacMiddleware.js');

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const log = new Log(req.body);
    await log.save();
    res.status(201).send({message: "Log created successfully",log});
  } catch (error) {
    res.status(400).send(error);
  }
});


router.get("/",authMiddleware, roleMiddleware('admin'), async (req, res) => {
    const filter = req.query;
    const searchText = filter.search;
    delete filter.search;
  
    let query = {};
  
    if (searchText) {
      query.$text = { $search: searchText };
    }

    query = { ...query, ...filter };
  
    try {
      const logs = await Log.find(query);
      res.json(logs);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  

module.exports = router;
