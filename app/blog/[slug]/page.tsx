'use client';

import { useParams, useRouter } from 'next/navigation';
import BlogHeader from '../../components/BlogHeader';
import { useBlogPost } from '../../hooks/useBlogPosts';
import BlogPost from './BlogPost';
import './BlogPost.css';

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
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

  if (error) {
    const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:8080';

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <BlogHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl shadow-red-200/50 p-12 text-center border border-white/20">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L5.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-4">記事が見つかりませんでした</h1>
              <p className="text-slate-600 mb-4 text-lg">
                WordPress サーバー ({wordpressUrl}) が起動しているか確認してください。
              </p>
              <p className="text-sm text-slate-500 mb-8 font-mono bg-slate-100 rounded-lg p-3">
                エラー詳細: {error}
              </p>
              <button
                onClick={() => router.push('/blog')}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-blue-200/50 font-semibold"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                ブログ一覧に戻る
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <BlogHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl shadow-slate-200/50 p-12 text-center border border-white/20">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-slate-400 to-slate-500 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-4">記事が見つかりませんでした</h1>
              <button
                onClick={() => router.push('/blog')}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-blue-200/50 font-semibold"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                ブログ一覧に戻る
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <BlogHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-sm text-slate-600 mb-8">
            <button
              onClick={() => router.push('/')}
              className="hover:text-blue-600 transition-colors duration-200 px-2 py-1 rounded-lg hover:bg-white/50"
            >
              ホーム
            </button>
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <button
              onClick={() => router.push('/blog')}
              className="hover:text-blue-600 transition-colors duration-200 px-2 py-1 rounded-lg hover:bg-white/50"
            >
              ブログ
            </button>
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-slate-900 font-medium bg-white/50 px-2 py-1 rounded-lg">記事</span>
          </nav>

          <BlogPost slug={slug} />
        </div>
      </main>
    </div>
  );
}
