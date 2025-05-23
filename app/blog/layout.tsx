import { Metadata } from 'next';
import BlogHeader from '../components/BlogHeader';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  icons: '/favicon.ico',
  title: 'Tech Blog - Naoya\'s Portfolio',
  description: '技術学習の記録と共有 - プログラミング、Linux、コンテナ技術などの学習記録',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BlogHeader />
      <main className="blog-main">
        {children}
      </main>
      <Footer />
    </>
  );
}
