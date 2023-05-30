import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
// import { NewsAPI } from "../services/api";

const initialState = {
    allRestaurants: [],
    choosenRest: "",
    shopingCard: [],
    formData: null
};

const shopSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

    }
});

const reducer = shopSlice.reducer;

export const { } = shopSlice.actions;
export default reducer;