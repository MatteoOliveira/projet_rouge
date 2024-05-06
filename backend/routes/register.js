const express = require('express');
const User = require('./model/User'); // Assurez-vous que le chemin est correct
const bcrypt = require('bcryptjs');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { pseudo, email, motDePasse } = req.body;
    const hashedPassword = await bcrypt.hash(motDePasse, 10);
    
    const newUser = new User({
      pseudo,
      email,
      motDePasse: hashedPassword,
      likes: [],
      watchlist: [],
      seen: []
    });
    
    await newUser.save();
    res.status(201).send("Utilisateur créé avec succès");
  } catch (error) {
    res.status(500).send("Erreur lors de la création de l'utilisateur");
  }
});

module.exports = router;
