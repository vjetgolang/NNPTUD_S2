const e = require('express');
var express = require('express');
var router = express.Router();
var bookModel = require('../schemas/book')
var responseHandle = require('../helpers/responseHandle')
/*
Sửa lại code của hàm get sao cho
Ngoài các giá trị gồm limit, sort, page thì cacs giá trị khác sẽ được 
tìm kiếm filter
*/

router.get('/', async function (req, res, next) {
  let limit = req.query.limit ? req.query.limit : 5;
  let page = req.query.page ? req.query.page : 1;
  let objSort = {};
  if (req.query.sort) {
    if (req.query.sort.startsWith('-')) {
      let field = req.query.sort.substring(1, req.query.sort.length);
      objSort[field] = -1;
    } else {
      let field = req.query.sort;
      objSort[field] = 1;
    }
  }
  var books = await bookModel.find({
    isDeleted: false,
    name: new RegExp(req.query.name.replace(",","|"),'i')
  }).skip((page - 1) * limit).limit(limit).sort(objSort).exec();
  res.send(books);
});

router.get('/:id', async function (req, res, next) {
  try {
    var book = await bookModel.find({ _id: req.params.id });
    responseHandle.renderResponse(res, true, book);
  } catch (error) {
    responseHandle.renderResponse(res, false, error);
  }
});
router.post('/', async function (req, res, next) {
  try {
    let newBook = new bookModel({
      name: req.body.name,
      year: req.body.year,
      author: req.body.author,
    })
    await newBook.save();
    responseHandle.renderResponse(res, true, newBook);
  } catch (error) {
    responseHandle.renderResponse(res, false, error);
  }
});
router.put('/:id', async function (req, res, next) {
  try {
    var book = await bookModel.findByIdAndUpdate
      (req.params.id, req.body, {
        new: true
      })
    responseHandle.renderResponse(res, true, book);
  } catch (error) {
    responseHandle.renderResponse(res, false, error);
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    var book = await bookModel.findByIdAndUpdate
      (req.params.id, {
        isDeleted: true
      }, {
        new: true
      })
    responseHandle.renderResponse(res, true, book);
  } catch (error) {
    responseHandle.renderResponse(res, false, error);
  }
});
module.exports = router;
