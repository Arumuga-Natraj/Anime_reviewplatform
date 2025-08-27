// app/api/anime/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch('https://api.jikan.moe/v4/top/anime');
  if (!res.ok) {
    return NextResponse.json({ error: 'API fetch failed' }, { status: 500 });
  }
  const data = await res.json();
  // Extract necessary fields
  const animeList = data.data.map((item: any) => ({
    slug: item.mal_id.toString(),
    title: item.title,
    image: item.images.jpg.image_url,
    description: item.synopsis || 'No synopsis available.'
  }));
  return NextResponse.json(animeList);
}
