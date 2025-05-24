import {Metadata} from 'next';
import BlogHeader from '../components/BlogHeader';
import BlogFooter from '../components/BlogFooter';
import '../blog.css';

export const metadata: Metadata = {
    icons: '/favicon.ico',
    title: 'Tech Blog - Naoya\'s Portfolio',
    description: '技術学習の記録と共有 - プログラミング、Linux、コンテナ技術などの学習記録',
    openGraph: {
        title: "Naoya's Blog",
        description:
            '技術学習の記録と共有 - プログラミング、Linux、コンテナ技術などの学習記録',
        images: [{
            url: "/mandolin.png", // 🌟 静的画像の指定
            width: 1200,
            height: 630
        }],
    },
};

export default function BlogLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <BlogHeader/>
            <main className="main-content">
                {children}
            </main>
            <BlogFooter/>
        </div>
    );
}
