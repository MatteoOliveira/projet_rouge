import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import * as ACTION from "../redux/article";


// COMPONENT



// ACTIONS
// import * as ACTION from "../redux/article";

import React from "react";

export default function Vus() {


const store = useSelector(state => state.article.data) // On utilise useSelector pour récupérer les données du store

let storeApp = [];
        
    const getFilm = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/films/getFilms");
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
    const dispatch = useDispatch(); 

    const theFilms = async () => {
        const data = await getFilm();
        dispatch(ACTION.FETCH_START())
        try{
            dispatch(ACTION.FETCH_SUCCESS(data))
        }catch(err){
            dispatch(ACTION.FETCH_FAILURE(err.message))
        }
    }

    useEffect(() => {
        theFilms();
   
    }, []);

    return (
        <div>
            <h1>vus</h1>
            {store && store.length > 0 ? (
                <ul>
                    {store.map(film => (
                        <li key={film.id}>
                            <h2>{film.titre} ({film.anneeDeProduction})</h2>
                            <p>Directed by: {film.realisateurs}</p>
                            <p>Duration: {film.duree}</p>
                            <p>{film.synopsis}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No films available. Check console for details.</p>
            )}
        </div>
    );
}

