'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
}

const OptimizedImage = ({ src, alt, width, height, priority = false, className = '' }: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '50px 0px',
  });

  const [blurDataUrl, setBlurDataUrl] = useState('');

  useEffect(() => {
    // Generate a tiny placeholder
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 10;
    canvas.height = 10;
    if (ctx) {
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(0, 0, 10, 10);
      setBlurDataUrl(canvas.toDataURL());
    }
  }, []);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: `${width}/${height}` }}
    >
      {(inView || priority) && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          priority={priority}
          placeholder="blur"
          blurDataURL={blurDataUrl}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}
    </div>
  );
};

export default OptimizedImage;
