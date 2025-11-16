// ✅ TODO change: Lazy loading image component with Intersection Observer
import { useState, useEffect, useRef, type ImgHTMLAttributes } from 'react';

interface LazyImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> {
  src: string;
  srcSet?: string;
  sources?: Array<{ media: string; srcSet: string }>;
  rootMargin?: string; // ✅ TODO change: Start loading before entering viewport (default: '50px')
  threshold?: number; // ✅ TODO change: Intersection threshold (default: 0.1)
}

export const LazyImage = ({
  src,
  srcSet,
  sources = [],
  rootMargin = '50px', // ✅ TODO change: Load 50px before visible
  threshold = 0.1, // ✅ TODO change: Start loading when 10% visible
  className = '',
  alt = '',
  ...props
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    // Check if image is already in viewport (for above-the-fold images)
    const rect = img.getBoundingClientRect();
    const marginValue = parseInt(rootMargin) || 0;
    const isVisible = rect.top < window.innerHeight + marginValue && rect.bottom > -marginValue;
    
    if (isVisible) {
      setIsInView(true);
      return;
    }

    // Use Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin, // ✅ TODO change: Adjust for earlier/later loading
        threshold, // ✅ TODO change: Adjust sensitivity
      }
    );

    observer.observe(img);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  // Render responsive picture element
  if (sources.length > 0) {
    return (
      <picture>
        {isInView && sources.map((source, index) => (
          <source key={index} media={source.media} srcSet={source.srcSet} />
        ))}
        <img
          ref={imgRef}
          src={isInView ? src : undefined}
          srcSet={isInView ? srcSet : undefined}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          loading="lazy"
          {...props}
        />
      </picture>
    );
  }

  // Render simple image
  return (
    <img
      ref={imgRef}
      src={isInView ? src : undefined}
      srcSet={isInView ? srcSet : undefined}
      alt={alt}
      onLoad={handleLoad}
      onError={handleError}
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      loading="lazy"
      {...props}
    />
  );
};

