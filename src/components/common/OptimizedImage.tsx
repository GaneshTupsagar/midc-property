import { useState } from 'react';
import Image from 'next/image';
import { BuildingOffice2Icon } from '@heroicons/react/24/outline';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
}

export default function OptimizedImage({ src, alt, className = '', fill, width, height }: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  if (error) {
    return (
      <div className={`bg-gray-100 flex items-center justify-center ${className}`}>
        <BuildingOffice2Icon className="h-12 w-12 text-gray-400" />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        className={`duration-700 ease-in-out ${isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'}`}
        onLoadingComplete={() => setIsLoading(false)}
        onError={handleError}
      />
    </div>
  );
}
