const express = require("express");
const router = express.Router();

const products = [
  { id: 1, name: "Rice Bag", category: "Groceries", price: 1200, weight: 2000 },
  { id: 2, name: "T-Shirt", category: "Fashion", price: 700, weight: 300 },
  { id: 3, name: "Headphones", category: "Electronics", price: 2500, weight: 400 },
];

router.get("/", (req, res) => {
  res.json(products);
});

module.exports = router;
