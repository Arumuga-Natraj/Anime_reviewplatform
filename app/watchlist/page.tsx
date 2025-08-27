'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';

type Anime = {
  slug: string;
  title: string;
  image: string;
};

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<Anime[]>([]);

  const fetchWatchlist = () => {
    fetch('/api/watchlist')
      .then(res => res.json())
      .then(setWatchlist);
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const handleRemove = async (slug: string) => {
    await fetch('/api/watchlist', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    });
    fetchWatchlist();
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Your Watchlist</h1>
        {watchlist.length === 0 ? (
          <p className="text-gray-500">Your watchlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {watchlist.map((anime) => (
              <div key={anime.slug} className="border rounded shadow">
                <img src={anime.image} alt={anime.title} className="w-full h-64 object-cover rounded-t" />
                <div className="p-3">
                  <h2 className="font-bold text-lg">{anime.title}</h2>
                  <button
                    onClick={() => handleRemove(anime.slug)}
                    className="mt-2 bg-red-500 text-white rounded px-3 py-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
