'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import BlogHeader from '../../components/BlogHeader';
import { useBlogPost } from '../../hooks/useBlogPosts';

function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

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

  const categories = post._embedded?.['wp:term']?.[0] || [];
  const author = post._embedded?.author?.[0];
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];

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

          <article className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl shadow-slate-200/50 overflow-hidden border border-white/20">
            {/* Featured Image */}
            {featuredImage && (
              <div className="relative aspect-[21/9] w-full overflow-hidden">
                <Image
                  src={featuredImage.source_url}
                  alt={featuredImage.alt_text || post.title.rendered}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-8 right-8">
                  {categories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category, index) => (
                        <span
                          key={index}
                          className="inline-block px-4 py-2 bg-white/90 backdrop-blur-sm text-slate-800 text-sm font-semibold rounded-full border border-white/20"
                        >
                          {category.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="p-12">
              {/* Categories (if no featured image) */}
              {!featuredImage && categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {categories.map((category, index) => (
                    <span
                      key={index}
                      className="inline-block px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 text-sm font-semibold rounded-full border border-blue-100"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 
                className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight tracking-tight"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />

              {/* Meta Information */}
              <div className="flex items-center space-x-6 text-sm text-slate-600 mb-12 pb-8 border-b border-slate-200">
                {author && (
                  <div className="flex items-center space-x-3">
                    {author.avatar_urls && (
                      <div className="relative">
                        <Image
                          src={author.avatar_urls['48'] || author.avatar_urls['96']}
                          alt={author.name}
                          width={40}
                          height={40}
                          className="rounded-full border-2 border-white shadow-lg"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-slate-900">{author.name}</div>
                      <div className="text-xs text-slate-500">著者</div>
                    </div>
                  </div>
                )}
                <div className="flex items-center space-x-2 px-4 py-2 bg-slate-50 rounded-full">
                  <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <time dateTime={post.date} className="font-medium">
                    {formatDateTime(post.date)}
                  </time>
                </div>
              </div>

              {/* Article Content */}
              {post.content && (
                <div className="prose prose-lg prose-slate max-w-none">
                  <style jsx global>{`
                    .prose {
                      color: rgb(51, 65, 85);
                      line-height: 1.75;
                    }
                    .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
                      color: rgb(15, 23, 42);
                      font-weight: 700;
                      margin-top: 2rem;
                      margin-bottom: 1rem;
                    }
                    .prose h2 {
                      font-size: 1.875rem;
                      border-bottom: 2px solid rgb(226, 232, 240);
                      padding-bottom: 0.5rem;
                    }
                    .prose h3 {
                      font-size: 1.5rem;
                    }
                    .prose p {
                      margin-bottom: 1.5rem;
                    }
                    .prose a {
                      color: rgb(59, 130, 246);
                      text-decoration: none;
                      font-weight: 500;
                      transition: all 0.2s;
                    }
                    .prose a:hover {
                      color: rgb(37, 99, 235);
                      text-decoration: underline;
                    }
                    .prose strong {
                      color: rgb(15, 23, 42);
                      font-weight: 600;
                    }
                    .prose code {
                      background-color: rgb(241, 245, 249);
                      color: rgb(219, 39, 119);
                      padding: 0.25rem 0.5rem;
                      border-radius: 0.375rem;
                      font-size: 0.875rem;
                      font-weight: 500;
                    }
                    .prose pre {
                      background-color: rgb(15, 23, 42);
                      color: rgb(226, 232, 240);
                      padding: 1.5rem;
                      border-radius: 0.75rem;
                      overflow-x: auto;
                      margin: 2rem 0;
                    }
                    .prose pre code {
                      background-color: transparent;
                      color: inherit;
                      padding: 0;
                      border-radius: 0;
                    }
                    .prose blockquote {
                      border-left: 4px solid rgb(59, 130, 246);
                      background-color: rgb(239, 246, 255);
                      padding: 1rem 1.5rem;
                      margin: 2rem 0;
                      border-radius: 0.5rem;
                      font-style: italic;
                    }
                    .prose img {
                      border-radius: 0.75rem;
                      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                      margin: 2rem 0;
                    }
                    .prose ul, .prose ol {
                      margin: 1.5rem 0;
                    }
                    .prose li {
                      margin: 0.5rem 0;
                    }
                    .prose table {
                      width: 100%;
                      border-collapse: collapse;
                      margin: 2rem 0;
                      background-color: white;
                      border-radius: 0.5rem;
                      overflow: hidden;
                      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                    }
                    .prose th {
                      background-color: rgb(241, 245, 249);
                      padding: 0.75rem 1rem;
                      text-align: left;
                      font-weight: 600;
                      color: rgb(15, 23, 42);
                    }
                    .prose td {
                      padding: 0.75rem 1rem;
                      border-top: 1px solid rgb(226, 232, 240);
                    }
                  `}</style>
                  <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                </div>
              )}

              {/* Article Actions */}
              <div className="mt-16 pt-8 border-t border-slate-200">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                  <button
                    onClick={() => router.push('/blog')}
                    className="inline-flex items-center px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl transition-all duration-300 transform hover:scale-105 font-semibold"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    ブログ一覧に戻る
                  </button>

                  <div className="flex space-x-4">
                    {/* Share Button */}
                    <button
                      onClick={() => {
                        const url = encodeURIComponent(window.location.href);
                        const text = encodeURIComponent(post.title.rendered);
                        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
                      }}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-blue-200/50"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                      シェア
                    </button>

                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-green-200/50"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      元記事を見る
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Related Posts Placeholder */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center px-8 py-4 bg-white/80 backdrop-blur-sm border border-white/20 rounded-full shadow-xl shadow-slate-200/50">
              <span className="text-slate-700 font-medium">関連記事を読む</span>
              <svg className="w-5 h-5 ml-2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
