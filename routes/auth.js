var express = require('express');
var router = express.Router();

//localhost:3000/books
router.get('/login', function (req, res, next) {
  res.send({
    message:"nguoi dung dang dang nhap"
  });
});
module.exports = router;
