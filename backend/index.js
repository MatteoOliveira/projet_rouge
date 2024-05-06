const express = require('express');
const mongoose = require('mongoose');
const readXlsxFile = require('read-excel-file/node');
const chokidar = require('chokidar');
const Film = require('./model/film');
const app = express();
const port = 3000;
const cors = require('cors');
const filmRoutes = require('./routes/routeFilm');

mongoose.connect('mongodb://localhost:27017/solutions_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connection successful'))
  .catch(err => console.error('MongoDB connection error:', err));

function importFilmsFromExcel() {
  const filePath = './film.xlsx';

  readXlsxFile(filePath).then((rows) => {
    rows.shift();
    const films = rows.map(row => ({
      id: row[0],
      titre: row[1],
      titreOriginal: row[2],
      realisateurs: row[3],
      anneeDeProduction: row[4],
      nationalite: row[5],
      duree: row[6],
      genre: row[7],
      synopsis: row[8]
    }));

    Film.deleteMany({}).then(() => {
      Film.insertMany(films)
        .then(() => console.log('Films imported successfully'))
        .catch(err => console.error('Error importing films:', err));
    }).catch(err => console.error('Error deleting films:', err));
  }).catch(err => console.error('Error reading Excel file:', err));
}

app.use(cors());

const watcher = chokidar.watch('./film.xlsx', { ignored: /^\./, persistent: true });

watcher.on('change', path => {
  console.log(`File ${path} has been changed, updating database...`);
  importFilmsFromExcel();
}).on('error', error => console.error(`Watcher error: ${error}`));

app.use('/api/films', filmRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
