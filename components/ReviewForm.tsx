'use client';
import { useState } from 'react';

interface ReviewFormProps {
  animeSlug: string;
  onSubmitted: () => void;
}

export default function ReviewForm({ animeSlug, onSubmitted }: ReviewFormProps) {
  const [stars, setStars] = useState(5);
  const [text, setText] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ animeSlug, stars, text })
    });

    if (res.ok) {
      setStars(5);
      setText('');
      onSubmitted();  // notify parent to reload reviews
    } else {
      alert('Failed to add review');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded">
      <div className="mb-2">
        <label className="block mb-1">Stars</label>
        <input
          type="number"
          min="1"
          max="5"
          value={stars}
          onChange={(e) => setStars(+e.target.value)}
          className="border p-1 w-full"
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Review</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border p-1 w-full"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">
        Submit Review
      </button>
    </form>
  );
}
