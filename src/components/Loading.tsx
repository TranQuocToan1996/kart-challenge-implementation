interface LoadingProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Loading = ({ message = 'Loading...', size = 'md' }: LoadingProps) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div
        className={`animate-spin rounded-full border-b-2 border-primary-orange ${sizeClasses[size]} mb-4`}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">{message}</span>
      </div>
      <p className="text-gray-600 text-center">{message}</p>
    </div>
  );
};

