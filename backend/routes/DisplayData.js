express = require("express");
const router = express.Router();

router.get("/fooditems", (req, res, next) => {
  res.send([global.food_items, global.foodCategory]);
  next();
});

module.exports = router;
