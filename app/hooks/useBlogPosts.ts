'use client';

import { useState, useEffect } from 'react';

interface BlogPost {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  link: string;
  date: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

interface UseBlogPostsReturn {
  posts: BlogPost[];
  loading: boolean;
  error: string | null;
}

function getWordPressApiUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:8080';
  // Remove trailing slash if present
  return baseUrl.replace(/\/$/, '');
}

export function useBlogPosts(): UseBlogPostsReturn {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const wordpressApiUrl = getWordPressApiUrl();
        const apiEndpoint = `${wordpressApiUrl}/wp-json/wp/v2/posts?_embed&per_page=6`;
        
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
  }, []);

  return { posts, loading, error };
}
