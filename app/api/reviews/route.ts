import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url!);
  const slug = url.searchParams.get('animeSlug');
  if (!slug) {
    return NextResponse.json({ error: 'animeSlug is required' }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db('anime_review');
  const reviews = await db.collection('reviews')
    .find({ animeSlug: slug })
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json(reviews);
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.animeSlug || !body.stars || !body.text) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db('anime_review');
  const result = await db.collection('reviews').insertOne({
    animeSlug: body.animeSlug,
    stars: body.stars,
    text: body.text,
    createdAt: new Date()
  });

  return NextResponse.json(result);
}
