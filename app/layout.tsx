import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    icons: '/favicon.ico',
    title: "Naoya - エンジニアポートフォリオ",
    description: "Web開発、Linux、コンテナ技術を中心に学習中のエンジニア志望学生のポートフォリオサイトです。",
    openGraph: {
        title: "Naoya - エンジニアポートフォリオ",
        description:
            "Web開発、Linux、コンテナ技術を中心に学習中のエンジニア志望学生のポートフォリオサイトです。",
        images: [{
            url: "/mandolin.png", // 🌟 静的画像の指定
            width: 1200,
            height: 630
        }],
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
        <head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"/>
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        {children}
        </body>
        </html>
    );
}
