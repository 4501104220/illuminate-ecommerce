const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
    res.send("Welcome to Shop Illuminate API!");
});

router.get("/api", function (req, res) {
    res.send("Welcome to Shop Illuminate API!");
});

module.exports = router;
