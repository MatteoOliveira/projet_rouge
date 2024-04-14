const express = require('express');
const router = express.Router();
const Film = require('../model/film'); // Modifiez le chemin selon votre structure de fichiers

// Route pour obtenir tous les films
router.get('/', async (req, res) => {
  try {
    const films = await Film.find();
    res.json(films);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;
