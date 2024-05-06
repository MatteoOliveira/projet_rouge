const express = require('express');
const router = express.Router();
const filmController = require('../controllers/filmController');

router.get('/getFilms', filmController.getAllFilms);

module.exports = router;
