import {configureStore} from "@reduxjs/toolkit";
import lists from "./reducers/list.js";


export const store = configureStore({
    reducer: {
        lists: lists,
    }
})