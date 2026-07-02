import { configureStore } from "@reduxjs/toolkit";
import { favoriteApi } from "./api/favorite";
import { setupListeners } from "@reduxjs/toolkit/query";
import { watchlistApi } from "./api/watchlist";

export const store = configureStore({
  reducer: {
    [favoriteApi.reducerPath]: favoriteApi.reducer,

    [watchlistApi.reducerPath]: watchlistApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      favoriteApi.middleware,
      watchlistApi.middleware,
    ),
});

setupListeners(store.dispatch);
