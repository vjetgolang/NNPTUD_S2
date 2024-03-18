var express = require('express');
var router = express.Router();

//->localhost:3000/api/v1
//localhost:3000/api/v1/books
router.use('/books',require('./books'))
//localhost:3000/api/v1/users
router.use('/users',require('./users'))
//localhost:3000/api/v1/auth
router.use('/auth',require('./auth'))
router.use('/users1',require('./users'))
module.exports = router;
