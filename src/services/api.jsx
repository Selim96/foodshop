import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://foodshop-4j8o.onrender.com";

class ShopAPI {
    // #baseURL = 'https://foodshop-4j8o.onrender.com/api';
    

    #allRestaurants = createAsyncThunk(
        "allRestaurants",
        async (_, { rejectWithValue }) => {
            try {
                const { data } = await axios.get('api/restaurants');
                return data;
            } catch (error) {
                return rejectWithValue(error.status);
            }
        }
    );

    #addOrder = createAsyncThunk(
        "addOrder",
        async (order, { rejectWithValue }) => {
            try {
                const { data } = await axios.post("/api/order", order);
                return data;
            } catch (error) {
                return rejectWithValue(error.status);
            };
        }
    );

    #getOrder = createAsyncThunk(
        "getOrder",
        async (email, { rejectWithValue }) => {
            try {
                const { data } = await axios.post("/api/order/history", email);
                return data;
            } catch (error) {
                return rejectWithValue(error.status);
            };
        }
    );


    allRestaurantFetch() {
        return this.#allRestaurants;
    };
    allRestaurants() {
        return this.#allRestaurants();
    };

    addOrderFetch() {
        return this.#addOrder;
    };
    addOrder() {
        return this.#addOrder();
    };

    getOrderFetch() {
        return this.#getOrder;
    };
    getOrder() {
        return this.#getOrder();
    };

};

export default ShopAPI;
