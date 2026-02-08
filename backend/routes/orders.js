const express = require("express");
const router = express.Router();

let orders = [];

router.post("/", (req, res) => {
  const order = {
    id: orders.length + 1,
    items: req.body.items,
    status: "CONFIRMED"
  };
  orders.push(order);
  res.json(order);
});

module.exports = router;
