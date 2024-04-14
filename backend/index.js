const express = require('express');
const mongoose = require('mongoose');
const readXlsxFile = require('read-excel-file/node');
const chokidar = require('chokidar');
const Film = require('./model/film'); // Assurez-vous que le chemin vers le modèle est correct
const app = express();
const port = 3000;
const cors = require('cors');
const filmRoutes = require('./routes/routeFilm');

// Remplacer par votre chaîne de connexion à MongoDB
const mongoUri = 'mongodb://localhost:27017/solutions_db';

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connection successful'))
  .catch(err => console.error('MongoDB connection error:', err));

function importFilmsFromExcel() {
  const filePath = './film.xlsx'; // Remplacer par le chemin vers votre fichier Excel

  readXlsxFile(filePath).then((rows) => {
    // Supprimer l'en-tête de la ligne
    rows.shift();

    const films = rows.map(row => {
      return {
        id: row[0],
        titre: row[1],
        titreOriginal: row[2],
        realisateurs: row[3],
        anneeDeProduction: row[4],
        nationalite: row[5],
        duree: row[6],
        genre: row[7],
        synopsis: row[8]
      };
    });

    // Effacer les données existantes et insérer les nouvelles données pour éviter les doublons
    Film.deleteMany({}).then(() => {
      Film.insertMany(films)
        .then(() => console.log('Films imported successfully'))
        .catch(err => console.error('Error importing films:', err));
    });
  });
}

app.use(cors());

// Utiliser chokidar pour surveiller le fichier Excel pour les modifications
const watcher = chokidar.watch('./film.xlsx', { ignored: /^\./, persistent: true });

watcher
  .on('change', path => {
    console.log(`File ${path} has been changed`);
    importFilmsFromExcel();
  })
  .on('error', error => console.error(`Watcher error: ${error}`));

  app.use('/films', filmRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
