'use client';

import { useState, useEffect } from 'react';

interface BlogPost {
  id: number;
  title: {
    rendered: string;
  };
  content?: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  link: string;
  date: string;
  slug: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    author?: Array<{
      name: string;
      avatar_urls: { [key: string]: string };
    }>;
    'wp:term'?: Array<Array<{
      name: string;
      slug: string;
    }>>;
  };
}

interface UseBlogPostsReturn {
  posts: BlogPost[];
  loading: boolean;
  error: string | null;
}

interface UseBlogPostReturn {
  post: BlogPost | null;
  loading: boolean;
  error: string | null;
}

function getWordPressApiUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:8080';
  // Remove trailing slash if present
  return baseUrl.replace(/\/$/, '');
}

export function useBlogPosts(limit?: number): UseBlogPostsReturn {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const wordpressApiUrl = getWordPressApiUrl();
        let apiEndpoint = `${wordpressApiUrl}/wp-json/wp/v2/posts?_embed&orderby=date&order=desc`;
        
        if (limit) {
          apiEndpoint += `&per_page=${limit}`;
        } else {
          apiEndpoint += `&per_page=10`;
        }
        
        console.log('Fetching posts from:', apiEndpoint);
        
        const response = await fetch(apiEndpoint);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }
        
        const data: BlogPost[] = await response.json();
        setPosts(data);
      } catch (err) {
        console.error('Failed to fetch blog posts:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch blog posts';
        setError(`WordPress API接続エラー: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [limit]);

  return { posts, loading, error };
}

export function useBlogPost(slug: string): UseBlogPostReturn {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const wordpressApiUrl = getWordPressApiUrl();
        const apiEndpoint = `${wordpressApiUrl}/wp-json/wp/v2/posts?slug=${slug}&_embed=1`;
        
        console.log('Fetching post from:', apiEndpoint);
        
        const response = await fetch(apiEndpoint);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }

        const data: BlogPost[] = await response.json();
        
        if (Array.isArray(data) && data.length > 0) {
          setPost(data[0]);
        } else {
          setPost(null);
          setError('記事が見つかりませんでした');
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        const errorMessage = err instanceof Error ? err.message : '記事の取得に失敗しました';
        setError(`WordPress API接続エラー: ${errorMessage}`);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  return { post, loading, error };
}
