import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import ShopAPI from "../services/api";

const shopApi = new ShopAPI();
const AllRestaurants = shopApi.allRestaurantFetch();
const addOrder = shopApi.addOrderFetch();
const getOrder = shopApi.getOrder();

const initialState = {
    allRestaurants: [],
    chosenRest: "",
    shoppingCard: [],
    ordersByEmail: [],
    formData: null,
    isLoading: false,
    error: null
};

const shopSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {
        chooseRest: (state, action) => {
            state.chosenRest = action.payload;
        },
    },
    extraReducers:{
        [AllRestaurants.pending]: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        [AllRestaurants.fulfilled]: (state, {payload}) => {
            state.isLoading = false;
            state.allRestaurants = payload;
        },
        [AllRestaurants.rejected]: (state, {payload}) => {
            state.isLoading = false;
            state.error = payload;
            if (payload) {
                toast.error("Fatal error");
            }
        },

        [addOrder.pending]: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        [addOrder.fulfilled]: (state, {payload}) => {
            state.isLoading = false;
            if (payload) {
                toast.success("Order is added");
            } else {
                toast.error("Try later");
            }
        },
        [addOrder.rejected]: (state, {payload}) => {
            state.isLoading = false;
            state.error = payload;
            if (payload === "Request failed with status code 409") {
                toast.error("Error, try again");
            } else {
                toast.error("Try later");
            }
        },

        [getOrder.pending]: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        [getOrder.fulfilled]: (state, {payload}) => {
            state.isLoading = false;
            state.ordersByEmail = payload;
        },
        [getOrder.rejected]: (state, {payload}) => {
            state.isLoading = false;
            state.error = payload;
            if (payload) {
                toast.error("Fatal error");
            }
        },
    }
});

const reducer = shopSlice.reducer;

export const {chooseRest } = shopSlice.actions;
export default reducer;