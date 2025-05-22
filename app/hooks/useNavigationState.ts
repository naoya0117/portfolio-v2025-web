'use client';

import { useState, useCallback } from 'react';

export type NavigationMode = 'main' | 'blog';

interface NavigationState {
  mode: NavigationMode;
  isTransitioning: boolean;
}

export function useNavigationState() {
  const [state, setState] = useState<NavigationState>({
    mode: 'main',
    isTransitioning: false
  });

  const switchToMainNav = useCallback(() => {
    if (state.mode === 'main') return;
    
    setState(prev => ({ ...prev, isTransitioning: true }));
    
    setTimeout(() => {
      setState({
        mode: 'main',
        isTransitioning: false
      });
    }, 150); // トランジション時間の半分
  }, [state.mode]);

  const switchToBlogNav = useCallback(() => {
    if (state.mode === 'blog') return;
    
    setState(prev => ({ ...prev, isTransitioning: true }));
    
    setTimeout(() => {
      setState({
        mode: 'blog',
        isTransitioning: false
      });
    }, 150); // トランジション時間の半分
  }, [state.mode]);

  return {
    mode: state.mode,
    isTransitioning: state.isTransitioning,
    switchToMainNav,
    switchToBlogNav
  };
}
