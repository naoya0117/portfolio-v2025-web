'use client';

import { useState, useEffect, useRef, RefObject } from 'react';

/**
 * カスタムフック: ヘッダーの高さを動的に測定する
 * 
 * @returns {Object} headerRef - ヘッダー要素に付与するref, headerHeight - ヘッダーの高さ(px)
 */
export function useHeaderHeight(): {
  headerRef: RefObject<HTMLElement>;
  headerHeight: number;
} {
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    // ヘッダーの高さを測定する関数
    const measureHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        setHeaderHeight(height);
      }
    };

    // 初期測定
    measureHeaderHeight();

    // リサイズイベントでヘッダーの高さを再測定
    window.addEventListener('resize', measureHeaderHeight);

    // クリーンアップ関数
    return () => {
      window.removeEventListener('resize', measureHeaderHeight);
    };
  }, []);

  return { headerRef, headerHeight };
}