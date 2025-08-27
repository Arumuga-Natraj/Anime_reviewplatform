'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';

type Blog = {
  title: string;
  body: string;
};

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && body) {
      setBlogs([{ title, body }, ...blogs]);
      setTitle('');
      setBody('');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Anime Blogs</h1>
        <form onSubmit={handleSubmit} className="space-y-3 mb-6">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border w-full p-2 rounded"
          />
          <textarea
            placeholder="Write your blog..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="border w-full p-2 rounded"
          />
          <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2">
            Post Blog
          </button>
        </form>

        <div className="space-y-4">
          {blogs.map((blog, idx) => (
            <div key={idx} className="border p-4 rounded shadow">
              <img src="/naruto.jpg" alt="anime" className="w-full h-48 object-cover rounded mb-2" />
              <h2 className="font-bold text-xl">{blog.title}</h2>
              <p>{blog.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
