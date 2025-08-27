'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-900 text-white p-4 shadow flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Image src="/Logo.png" alt="Logo" width={60} height={40} className="rounded" />
      </div>
      <div className="space-x-6 flex items-center">
        <Link href="/" className="hover:text-yellow-400">Home</Link>
        <Link href="/watchlist" className="hover:text-yellow-400">Watchlist</Link>
        <Link href="/blog" className="hover:text-yellow-400">Blog</Link>

        {session ? (
          <>
            <span className="text-sm text-gray-300">{session.user?.email}</span>
            <button
              onClick={() => signOut()}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-yellow-400">Login</Link>
            <Link href="/signup" className="hover:text-yellow-400">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
