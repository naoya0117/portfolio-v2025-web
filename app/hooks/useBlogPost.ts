'use client';

import { useState, useEffect } from 'react';

interface BlogPost {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  date: string;
  modified: string;
  author: number;
  slug: string;
  link: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
      caption?: {
        rendered: string;
      };
    }>;
    author?: Array<{
      id: number;
      name: string;
      avatar_urls?: {
        [key: string]: string;
      };
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
}

interface UseBlogPostReturn {
  post: BlogPost | null;
  loading: boolean;
  error: string | null;
}

function getWordPressApiUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:8080';
  return baseUrl.replace(/\/$/, '');
}

export function useBlogPost(postId: string | number): UseBlogPostReturn {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) {
      setLoading(false);
      setError('記事IDが指定されていません');
      return;
    }

    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const wordpressApiUrl = getWordPressApiUrl();
        const apiEndpoint = `${wordpressApiUrl}/wp-json/wp/v2/posts/${postId}?_embed`;
        
        console.log('Fetching post from:', apiEndpoint);
        
        const response = await fetch(apiEndpoint);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('記事が見つかりません');
          }
          throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }
        
        const data: BlogPost = await response.json();
        setPost(data);
      } catch (err) {
        console.error('Failed to fetch blog post:', err);
        const errorMessage = err instanceof Error ? err.message : '記事の取得に失敗しました';
        setError(`WordPress API接続エラー: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  return { post, loading, error };
}
