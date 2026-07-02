import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { movie_id, user_id } = await req.json();

  if (!movie_id || !user_id || !session) {
    return NextResponse.json(
      { error: "movie_id and user_id required" },
      { status: 400 },
    );
  }

  try {
    const watchlist = await prisma.watchlist.create({
      data: {
        movie_id,
        user_id,
      },
    });

    return NextResponse.json(watchlist, {
      status: 200,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Cannot create watchlist" },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);

  const user_id = url.searchParams.get("user_id");

  if (!user_id) {
    return NextResponse.json({ error: "user_id required" }, { status: 400 });
  }

  try {
    const watchlist = await prisma.watchlist.findMany({
      where: { user_id },

      select: {
        movie_id: true,
        id: true,
      },
    });

    const moviesData = await Promise.all(
      watchlist.map(async (movieItem) => {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieItem.movie_id}?api_key=137772c7c1451abb30832465cd2bca39`,
        );

        const movie = await res.json();

        return {
          ...movie,

          watchlistId: movieItem.id,

          movie_id: movieItem.movie_id,
        };
      }),
    );

    return NextResponse.json(moviesData);
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Cannot fetch watchlist" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);

    const movie_id = Number(url.searchParams.get("id"));

    const user_id = url.searchParams.get("user_id");

    if (!movie_id || !user_id) {
      return NextResponse.json(
        { error: "movie_id and user_id required" },
        { status: 400 },
      );
    }

    const deletedWatchlist = await prisma.watchlist.deleteMany({
      where: {
        user_id,
        movie_id,
      },
    });

    return NextResponse.json({
      success: true,
      deletedWatchlist,
    });
  } catch (err) {
    console.error("Error deleting watchlist:", err);

    return NextResponse.json(
      { error: "Cannot delete watchlist" },
      { status: 500 },
    );
  }
}
