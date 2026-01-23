/**
 * Dot Grid Background Component
 * 
 * This file contains the DotGrid component that provides
 * an interactive animated dot grid background using GSAP.
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../../shared/useTheme';

/**
 * Dot Grid Component Props
 */
export interface DotGridProps {
  /** Size of each dot in pixels */
  dotSize?: number;
  /** Gap between dots in pixels */
  gap?: number;
  /** Base color of dots */
  baseColor?: string;
  /** Active color for amplification */
  activeColor?: string;
}

/**
 * Dot Grid Component
 * 
 * An animated dot grid background with GSAP animations
 * and random hotspot amplification effects.
 * 
 * Features:
 * - Animated dot grid with random hotspots
 * - Customizable colors and sizes
 * - Theme-aware defaults
 * - Smooth GSAP animations
 * - Performance optimized
 * - Responsive design
 * 
 * @param props - DotGrid component props
 * @returns JSX element
 * 
 * @example
 * ```tsx
 * <DotGrid
 *   dotSize={3}
 *   gap={40}
 *   baseColor="#352424"
 *   activeColor="#5227FF"
 * />
 * ```
 */
export const DotGrid: React.FC<DotGridProps> = ({
  dotSize = 3,
  gap = 40,
  baseColor,
  activeColor,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement[]>([]);
  const { theme } = useTheme();
  const animationRefs = useRef<gsap.core.Tween[]>([]);

  // Theme-aware default colors - 20% more visible base colors
  const defaultBaseColor = baseColor || (theme === 'dark' ? 'rgba(255, 255, 255, 0.48)' : 'rgba(0, 0, 0, 0.36)');
  const defaultActiveColor = activeColor || (theme === 'dark' ? 'rgba(82, 39, 255, 1)' : 'rgba(82, 39, 255, 0.9)');

  // Calculate grid based on viewport
  const calculateGrid = useCallback(() => {
    if (typeof window === 'undefined') return { rows: 20, cols: 20 };
    
    const rows = Math.ceil(window.innerHeight / gap) + 2;
    const cols = Math.ceil(window.innerWidth / gap) + 2;
    
    return { rows, cols };
  }, [gap]);

  const [gridConfig, setGridConfig] = useState(calculateGrid);

  // Update grid on resize
  useEffect(() => {
    const handleResize = () => {
      setGridConfig(calculateGrid());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateGrid]);

  // Breathing effect for all dots
  useEffect(() => {
    if (!containerRef.current || dotsRef.current.length === 0) return;

    // Continuous breathing animation for all dots
    dotsRef.current.forEach((dot) => {
      if (!dot) return;

      const breathingTween = gsap.to(dot, {
        opacity: theme === 'dark' ? 0.52 : 0.4, // Slightly brighter for breathing
        scale: 1.05,
        duration: 3 + Math.random() * 1, // 3-4 seconds
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      animationRefs.current.push(breathingTween);
    });

    return () => {
      animationRefs.current.forEach(anim => anim.kill());
      animationRefs.current = [];
    };
  }, [defaultBaseColor, theme]);

  // Random hotspot amplification effects
  useEffect(() => {
    if (!containerRef.current || dotsRef.current.length === 0) return;

    const createRandomHotspot = () => {
      // Random position on screen
      const hotspotX = Math.random() * window.innerWidth;
      const hotspotY = Math.random() * window.innerHeight;
      const hotspotRadius = 150 + Math.random() * 200; // 150-350px radius (larger)

      dotsRef.current.forEach((dot) => {
        if (!dot) return;

        const rect = dot.getBoundingClientRect();
        const dotX = rect.left + rect.width / 2;
        const dotY = rect.top + rect.height / 2;

        const dx = hotspotX - dotX;
        const dy = hotspotY - dotY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < hotspotRadius) {
          // Calculate effect strength based on distance from hotspot center
          const effectStrength = 1 - (distance / hotspotRadius);
          const scale = 1 + effectStrength * 1.5; // Scale up to 2.5x
          const opacity = theme === 'dark' 
            ? 0.48 + effectStrength * 0.4 
            : 0.36 + effectStrength * 0.3;

          // Amplify dot - 15% slower (0.8 * 1.15 = 0.92)
          const amplifyTween = gsap.to(dot, {
            scale,
            backgroundColor: defaultActiveColor,
            opacity,
            duration: 0.92, // 15% slower
            ease: 'power2.out',
            onComplete: () => {
              // Return to breathing state - 15% slower (1.2 * 1.15 = 1.38)
              const returnTween = gsap.to(dot, {
                scale: 1.05, // Return to breathing scale
                backgroundColor: defaultBaseColor,
                opacity: theme === 'dark' ? 0.52 : 0.4, // Return to breathing opacity
                duration: 1.38, // 15% slower
                ease: 'power2.inOut',
              });
              animationRefs.current.push(returnTween);
            }
          });
          animationRefs.current.push(amplifyTween);
        }
      });

      // Schedule next random hotspot (2-5 seconds)
      setTimeout(createRandomHotspot, 2000 + Math.random() * 3000);
    };

    // Start first hotspot after initial delay
    setTimeout(createRandomHotspot, 1000 + Math.random() * 2000);

    return () => {
      animationRefs.current.forEach(anim => anim.kill());
      animationRefs.current = [];
    };
  }, [defaultBaseColor, defaultActiveColor, theme]);

  // Generate dot grid
  const dots: JSX.Element[] = [];
  const { rows, cols } = gridConfig;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const index = i * cols + j;
      dots.push(
        <div
          key={`${i}-${j}`}
          ref={(el) => {
            if (el) dotsRef.current[index] = el;
          }}
          className="dot absolute rounded-full transition-colors"
          style={{
            left: `${j * gap}px`,
            top: `${i * gap}px`,
            width: `${dotSize}px`,
            height: `${dotSize}px`,
            backgroundColor: defaultBaseColor,
            opacity: theme === 'dark' ? 0.48 : 0.36, // Always visible base state (20% more visible)
            transformOrigin: 'center',
          }}
        />
      );
    }
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden z-0"
      style={{
        background: 'hsl(var(--bg-1))',
        pointerEvents: 'none',
      }}
    >
      <div className="relative w-full h-full" style={{ pointerEvents: 'none' }}>
        {dots}
      </div>
    </div>
  );
};

export default DotGrid;
