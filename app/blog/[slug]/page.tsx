'use client';

import { useParams, notFound } from 'next/navigation';
import BlogHeader from '../../components/BlogHeader';
import { useBlogPost } from '../../hooks/useBlogPosts';
import BlogPost from './BlogPost';
import './BlogPost.css';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { post, loading, error } = useBlogPost(slug);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <BlogHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl shadow-slate-200/50 p-12 border border-white/20">
              <div className="animate-pulse">
                {/* Breadcrumb */}
                <div className="flex items-center space-x-2 mb-8">
                  <div className="h-4 bg-slate-200 rounded w-16"></div>
                  <div className="h-4 bg-slate-200 rounded w-4"></div>
                  <div className="h-4 bg-slate-200 rounded w-20"></div>
                  <div className="h-4 bg-slate-200 rounded w-4"></div>
                  <div className="h-4 bg-slate-200 rounded w-32"></div>
                </div>

                {/* Featured Image */}
                <div className="h-80 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl mb-8"></div>

                {/* Title */}
                <div className="h-12 bg-slate-200 rounded-lg mb-6"></div>
                <div className="h-8 bg-slate-200 rounded-lg w-3/4 mb-8"></div>

                {/* Meta */}
                <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-slate-200">
                  <div className="h-8 bg-slate-200 rounded-full w-8"></div>
                  <div className="h-4 bg-slate-200 rounded w-24"></div>
                  <div className="h-4 bg-slate-200 rounded w-32"></div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div className="h-4 bg-slate-200 rounded"></div>
                  <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                  <div className="h-4 bg-slate-200 rounded w-4/5"></div>
                  <div className="h-4 bg-slate-200 rounded"></div>
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !post) {
    // Trigger the Next.js 404 page with proper status code
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <BlogHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto">
          <BlogPost slug={slug} />
        </div>
      </main>
    </div>
  );
}
