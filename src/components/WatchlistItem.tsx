"use client";
import type { MediaItem } from "@/types/mediaItems";
import React, { type FC } from "react";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useSession } from "@/lib/auth-client";
import { useDeleteWatchlistMutation } from "@/store/api/watchlist";
import MovieFavoriteListCard from "./MovieFavoriteListCard";

type WatchlistItemProps = {
  movie: MediaItem;
};

const WatchlistItem: FC<WatchlistItemProps> = ({ movie }) => {
  const { data: session } = useSession();

  const user_id = session?.user?.id;

  const [deleteWatchlist] = useDeleteWatchlistMutation();

  const handleRemove = () => {
    if (!user_id) return;

    deleteWatchlist({
      movie_id: movie.id,
      user_id,
    });
  };

  return (
    <div className="relative gap-4 w-full">
      <MovieFavoriteListCard movie={movie} />

      <div className="absolute top-2 right-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={handleRemove}>
              <Trash2 color="red" />
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            <p>Remove from watchlist</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default WatchlistItem;
