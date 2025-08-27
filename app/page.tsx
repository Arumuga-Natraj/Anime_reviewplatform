'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

type Anime = {
  slug: string;
  title: string;
  description: string;
  image: string;
};

export default function HomePage() {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const router = useRouter();

  useEffect(() => {
  fetch('/api/anime')
    .then(res => res.json())
    .then((data) => {
      const animeData = data as Anime[]; 
      const uniqueAnime = Array.from(
        new Map(animeData.map((a) => [a.slug, a])).values()
      );
      setAnimeList(uniqueAnime);
    });
}, []);



  const handleAddToWatchlist = async (e: React.MouseEvent, anime: Anime) => {
    e.stopPropagation();
    const res = await fetch('/api/watchlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(anime),
    });

    if (res.status === 409) {
      alert('Already in watchlist!');
    } else if (res.ok) {
      alert('Added to watchlist!');
    } else {
      alert('Failed to add.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Top Anime</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {animeList.map((anime) => (
            <div
              key={`${anime.slug}-${anime.title}`}
              onClick={() => router.push(`/anime/${anime.slug}`)}
              className="cursor-pointer border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              <img src={anime.image} alt={anime.title} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold">{anime.title}</h2>
                <p className="text-gray-600 line-clamp-3">{anime.description}</p>
                <button
                  onClick={(e) => handleAddToWatchlist(e, anime)}
                  className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Add to Watchlist
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
