// app/api/anime/[slug]/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const awaitedParams = await params;
  const slug = awaitedParams.slug;

  const res = await fetch(`https://api.jikan.moe/v4/anime/${slug}`);
  const item = await res.json();

  const anime = {
    slug: slug,
    title: item.data.title,
    image: item.data.images.jpg.image_url,
    description: item.data.synopsis || 'No synopsis.',
  };

  return new Response(JSON.stringify(anime), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

