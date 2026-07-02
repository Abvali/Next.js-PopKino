import { useState, useEffect, useCallback } from "react";
import {
  useGetWatchlistQuery,
  useAddWatchlistMutation,
  useDeleteWatchlistMutation,
} from "@/store/api/watchlist";
import { useSession } from "@/lib/auth-client";
import { skipToken } from "@reduxjs/toolkit/query";
export const useToggleWatchlist = (movie_id: number) => {
  const { data: session } = useSession();
  const user_id = session?.user?.id;

  const { data: watchlist } = useGetWatchlistQuery(
    user_id ? { user_id } : skipToken,
  );

 const [isWatchlist, setIsWatchlist] = useState(false);
  const [addWatchlist] = useAddWatchlistMutation();
  const [deleteWatchlist] = useDeleteWatchlistMutation();

  useEffect(() => {
    if (watchlist) {
      const found = watchlist.some((f) => f.id === movie_id);
      setIsWatchlist(found);
    }
  }, [watchlist, movie_id]);

  const toggleWatchlistClick = useCallback(async () => {
    if (!user_id) return;
    const nextState = !isWatchlist;
    setIsWatchlist(nextState);

    try {
      if (nextState) {
        await addWatchlist({ movie_id, user_id }).unwrap();
      } else {
        await deleteWatchlist({ movie_id, user_id }).unwrap();
      }
    } catch (e) {
      console.error("Error toggling watchlist", e);
      setIsWatchlist((prev) => !prev);
    }
  }, [isWatchlist, addWatchlist, deleteWatchlist, movie_id, user_id]);

  return { isWatchlist, toggleWatchlistClick };
};
