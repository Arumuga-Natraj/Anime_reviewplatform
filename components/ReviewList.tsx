interface Review {
  stars: number;
  text: string;
  createdAt: string;
}

interface ReviewListProps {
  reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  return (
    <div className="mt-4">
      <h2 className="font-bold mb-2">Reviews</h2>
      {reviews.length === 0 && <p>No reviews yet.</p>}
      {reviews.map((r, idx) => (
        <div key={idx} className="border p-2 mb-2 rounded">
          <div>⭐ {r.stars}</div>
          <div>{r.text}</div>
          <div className="text-xs text-gray-500">{new Date(r.createdAt).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
}
