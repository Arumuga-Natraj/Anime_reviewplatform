'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ReviewForm from '@/components/ReviewForm';
import ReviewList from '@/components/ReviewList';

type Anime = {
  title: string;
  synopsis: string;
  images: { jpg: { image_url: string } };
};

type Review = {
  stars: number;
  text: string;
  createdAt: string;
};

export default function AnimeReviewPage() {
  const { slug } = useParams();
  const slugStr = Array.isArray(slug) ? slug[0] : slug || '';
  const [anime, setAnime] = useState<Anime | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (!slugStr) return;

    // Your custom API route that fetches Jikan data
    fetch(`/api/anime/${slugStr}`)
      .then(res => res.json())
      .then(setAnime)
      .catch(console.error);

    // Load reviews
    loadReviews();
  }, [slugStr]);

  function loadReviews() {
    fetch(`/api/reviews?animeSlug=${slugStr}`)
      .then(res => res.json())
      .then(setReviews)
      .catch(console.error);
  }

  if (!anime) return <div className="p-6">Loading anime details…</div>;

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto">
        <img
          src={anime.images?.jpg?.image_url || 'https://via.placeholder.com/400x600'}
          alt={anime.title}
          className="w-full rounded shadow mb-4"
        />

        <h1 className="text-3xl font-bold mb-2">{anime.title}</h1>
        <p className="text-gray-600 mb-4">{anime.synopsis}</p>

        <ReviewForm animeSlug={slugStr} onSubmitted={loadReviews} />
        <ReviewList reviews={reviews} />
      </div>
    </div>
  );
}
