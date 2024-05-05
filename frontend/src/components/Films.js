import React, { useState, useEffect } from 'react';
import { getAllFilms } from './controllers/filmController';

function Films() {
    const [films, setFilms] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllFilms();
                setFilms(data);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };
        fetchData();
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
