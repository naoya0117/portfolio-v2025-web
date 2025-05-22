'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

export const usePageTransition = () => {
  const router = useRouter();

  const navigateWithTransition = useCallback((url: string) => {
    // より自然なページ遷移アニメーション
    document.body.classList.add('page-transition-active');
    
    const pageContent = document.querySelector('.page-content') || document.body;
    pageContent.classList.add('page-transition-out');

    // 自然な遅延時間に調整
    setTimeout(() => {
      router.push(url);
    }, 250);
  }, [router]);

  const handlePageLoad = useCallback(() => {
    // ページロード時の自然なフェードイン
    document.body.classList.remove('page-transition-active');
    const pageContent = document.querySelector('.page-content') || document.body;
    
    // 初期状態を設定
    pageContent.classList.add('page-transition-enter');
    
    requestAnimationFrame(() => {
      pageContent.classList.remove('page-transition-out');
      pageContent.classList.add('page-transition-enter-active');
      
      setTimeout(() => {
        pageContent.classList.remove('page-transition-enter');
        pageContent.classList.remove('page-transition-enter-active');
      }, 400);
    });
  }, []);

  return { navigateWithTransition, handlePageLoad };
};
