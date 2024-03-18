const e = require('express');
var express = require('express');
var router = express.Router();

//localhost:3000/books -GET
//localhost:3000/books/id - GET
//localhost:3000/books - POST
//localhost:3000/books/id - PUT
//localhost:3000/books/id - DELETE
var books = [{
  id: 1,
  name: "Tieng viet 1"
}, {
  id: 2,
  name: "Tieng viet 2"
}, {
  id: 3,
  name: "Tieng viet 3"
}]
router.get('/', function (req, res, next) {
  let undeleted = books.filter(b => !b.isDeleted);
  res.send(undeleted);
});

router.put('/restore/:id', function (req, res, next) {
  var getbook = books.find(b => b.id == req.params.id);
  if (getbook) {
    getbook.isDeleted = undefined;
    res.status(200).send(getbook)
  } else {
    res.status(404).send("ID khong ton tai");
  }
});

function GenID(length) {
  var source = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz0123456789";
  var result = "";
  for (let i = 0; i < length; i++) {
    var rand = Math.floor(Math.random()* 61);
    result += source[rand]
  }
  return result;
}

router.get('/:id', function (req, res, next) {
  var getbook = books.filter(b => b.id == req.params.id);
  if (getbook.length > 0) {
    res.send(getbook[0])
  } else {
    res.status(404).send("ID khong ton tai")
  }
});
router.post('/', function (req, res, next) {
  // var getbook = books.find(b => b.id == req.body.id);
  // if (getbook) {
  //   res.status(404).send("ID da ton tai")
  // } else {
    var newBook = {
      id: GenID(16),
      body: req.body.name
    }
    books.push(newBook)
    res.status(200).send(newBook)
  // }
});
router.put('/:id', function (req, res, next) {
  var getbook = books.find(b => b.id == req.params.id);
  if (getbook) {
    getbook.name = req.body.name;
    res.status(200).send(getbook)
  } else {
    res.status(404).send("ID khong ton tai");
  }
});

router.delete('/:id', function (req, res, next) {
  var getbook = books.find(b => b.id == req.params.id);
  if (getbook) {
    // let index = books.indexOf(getbook);
    // books.splice(index,1)
    getbook.isDeleted = true;
    res.status(200).send(getbook)
  } else {
    res.status(404).send("ID khong ton tai");
  }
});
module.exports = router;
