
import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  const client = await clientPromise;
  const db = client.db('anime_review');
  const watchlist = await db.collection('watchlists').find().toArray();
  return NextResponse.json(watchlist);
}

export async function POST(req: Request) {
  const client = await clientPromise;
  const db = client.db('anime_review');
  const body = await req.json();

  // Optionally: validate body fields
  const result = await db.collection('watchlists').insertOne(body);
  return NextResponse.json(result);
}
