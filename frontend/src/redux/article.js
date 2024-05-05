import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    data: null,
    loading: null,
    error: false,
}

export const Films = createSlice({
    name: "Films",
    initialState,
    /*
        C'est ici que les reducers sont définis. Les reducers sont des fonctions qui décrivent comment l'état de l'application change en réponse à des actions (envoyées au store).
    */
    reducers : {
        FETCH_START: (draft) => {
            draft.loading = true;
        },
        FETCH_SUCCESS: (draft, action) => {
            draft.loading = false;
            draft.data = action.payload;
        },
        FETCH_FAILURE: (draft) => {
            draft.loading = false;
            draft.error = true;
        }
    }

})

export const { FETCH_START, FETCH_SUCCESS, FETCH_FAILURE } = Films.actions;

export default Films.reducer;
