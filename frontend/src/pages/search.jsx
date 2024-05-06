import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Search = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (query) {
            setLoading(true);
            fetch(`http://localhost:3000/api/films/search?query=${encodeURIComponent(query)}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setFilms(data);
                    setLoading(false);
                })
                .catch(err => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [query]);

    return (
        <div>
            <h1>Search Results for: {query}</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                films.length > 0 ? (
                    <ul>
                        {films.map(film => (
                            <li key={film._id || film.id}>
                                <h2>{film.titre}</h2>
                                <p>{film.realisateurs}</p>
                                <p>{film.anneeDeProduction}</p>
                                <p>{film.synopsis}</p>
                            </li>
                        ))}
                    </ul>
                ) : <p>No films found for "{query}".</p>
            )}
        </div>
    );
};

export default Search;
