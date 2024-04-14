// src/Films.js
import React, { useState, useEffect } from 'react';

function Films() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/films') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setFilms(data))
      .catch(error => console.error('There was a problem with the fetch operation:', error));
  }, []);

  return (
    <div>
      <h1>Liste des Films</h1>
      <ul>
        {films.map((film, index) => (
          <li key={index}>
            {film.titre} - Réalisé par {film.realisateurs} - {film.anneeDeProduction}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Films;
