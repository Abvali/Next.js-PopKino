import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { MediaItem } from '@/types/mediaItems';

export const watchlistApi = createApi({
  reducerPath: 'watchlistApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3002/api',
  }),

  tagTypes: ['Watchlist'],

  endpoints: (builder) => ({
    getWatchlist: builder.query<
      MediaItem[],
      { user_id: string }
    >({
      query: ({ user_id }) =>
        `/watchlist?user_id=${user_id}`,

      providesTags: ['Watchlist'],
    }),

    addWatchlist: builder.mutation<
      { success: boolean },
      { movie_id: number; user_id: string }
    >({
      query: (body) => ({
        url: '/watchlist',
        method: 'POST',
        body,
      }),

      invalidatesTags: ['Watchlist'],
    }),

    deleteWatchlist: builder.mutation<
      { success: boolean },
      { movie_id: number; user_id: string }
    >({
      query: ({ movie_id, user_id }) => ({
        url: `/watchlist?id=${movie_id}&user_id=${user_id}`,

        method: 'DELETE',
      }),

      invalidatesTags: ['Watchlist'],
    }),
  }),
});

export const {
  useGetWatchlistQuery,
  useAddWatchlistMutation,
  useDeleteWatchlistMutation,
} = watchlistApi;