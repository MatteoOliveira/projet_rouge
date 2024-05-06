router.post('/login', async (req, res) => {
    try {
      const { email, motDePasse } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send("Utilisateur non trouvé");
      }
      
      const isMatch = await bcrypt.compare(motDePasse, user.motDePasse);
      if (!isMatch) {
        return res.status(400).send("Mot de passe incorrect");
      }
      
      // Gérer la création de la session ici
      req.session.user = user;
      res.send("Connexion réussie");
    } catch (error) {
      res.status(500).send("Erreur de connexion");
    }
  });
  