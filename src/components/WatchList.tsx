"use client";
import React, { type FC } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { useSession } from "@/lib/auth-client";
import { useGetWatchlistQuery } from "@/store/api/watchlist";
import WatchlistItem from "./WatchlistItem";

const WatchlistList: FC = () => {
  const { data: session } = useSession();

  const user_id = session?.user?.id;

  const {
    data: watchlist,
    isLoading,
    isError,
  } = useGetWatchlistQuery(user_id ? { user_id } : skipToken);

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-red-500">Error loading watchlist</p>
    );
  }

  if (!session) {
    return (
      <p className="text-center mt-10">
        You need to sign in to see your watchlist!
      </p>
    );
  }

  if (!watchlist || watchlist.length === 0) {
    return <p className="text-center mt-10">Your watchlist is empty</p>;
  }

  return (
    <div className="mt-10 px-4">
      <h1 className="text-3xl font-bold text-center">My Watchlist</h1>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {watchlist.map((movie) => (
          <WatchlistItem key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default WatchlistList;
