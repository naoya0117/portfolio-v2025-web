import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

function getWordPressApiUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:8080';
  return baseUrl.replace(/\/$/, '');
}

async function getPost(slug: string) {
  try {
    const wordpressApiUrl = getWordPressApiUrl();
    const apiEndpoint = `${wordpressApiUrl}/wp-json/wp/v2/posts?slug=${slug}&_embed=1`;
    
    const response = await fetch(apiEndpoint, {
      next: { revalidate: 60 } // 1分間キャッシュ
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return Array.isArray(data) && data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error('Error fetching post for metadata:', error);
    return null;
  }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: '記事が見つかりません | Naoya\'s Tech Blog',
      description: 'お探しの記事が見つかりませんでした。',
    };
  }

  const title = stripHtml(post.title.rendered);
  const description = stripHtml(post.excerpt.rendered).substring(0, 160);
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

  return {
    title: `${title} | Naoya's Tech Blog`,
    description,
    openGraph: {
      title,
      description,
      images: featuredImage ? [{ url: featuredImage }] : [],
      type: 'article',
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: featuredImage ? [featuredImage] : [],
    },
  };
}
