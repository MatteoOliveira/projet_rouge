const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filmSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  titre: { type: String, required: true },
  titreOriginal: { type: String, default: null },
  realisateurs: { type: String, required: true },
  anneeDeProduction: { type: Number, required: true },
  nationalite: { type: String, required: true },
  duree: { type: String, required: true }, // Vous pouvez créer un middleware pour convertir cela en minutes si nécessaire
  genre: { type: String, default: null },
  synopsis: { type: String, required: true }
});

const Film = mongoose.model('Film', filmSchema);

module.exports = Film;
