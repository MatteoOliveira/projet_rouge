import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


// COMPONENT



// ACTIONS
// import * as ACTION from "../redux/article";

import React from "react";

const Home = () => {

    // const store = useSelector(state => state.article.data) // On utilise useSelector pour récupérer les données du store

    // let storeApp = [];

    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(ACTION.FETCH_START())
    //     try{
    //         dispatch(ACTION.FETCH_SUCCESS(Data))
    //     }catch(e){
    //         dispatch(ACTION.FETCH_FAILLURE(e))
    //     }
    // }, [])
    
    // console.log(store)

    return(
        <div>
            <h1>Home</h1>

        </div>
    );
}

export default Home;