import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./slice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistSession = {
  key: "shoppingCard",
  storage,
  blacklist: ["allRestaurants", "error", "ordersByEmail", "isLoading"],
};

const store = configureStore({
    reducer: persistReducer(persistSession, mainReducer),
    middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  ],
  devTools: process.env.NODE_ENV === "development",
});

const persistedStore = persistStore(store);
export { store, persistedStore };