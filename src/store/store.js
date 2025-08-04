import {configureStore} from "@reduxjs/toolkit";
import lists from "../store/reducers/list.js";


export const store = configureStore({
    reducer: {
        lists: lists,
    }
})