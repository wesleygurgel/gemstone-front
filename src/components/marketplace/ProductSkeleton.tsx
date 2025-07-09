
interface ProductSkeletonProps {
  className?: string;
}

const ProductSkeleton = ({ className = '' }: ProductSkeletonProps) => {
  return (
    <div className={`bg-black-800 rounded-lg overflow-hidden border border-gem-purple/10 ${className}`}>
      {/* Image skeleton */}
      <div className="aspect-square bg-black-700 animate-pulse"></div>

      <div className="p-4">
        {/* Category skeleton */}
        <div className="h-3 w-16 bg-black-700 animate-pulse rounded mb-2"></div>

        {/* Name skeleton - two lines */}
        <div className="h-4 w-full bg-black-700 animate-pulse rounded mb-1"></div>
        <div className="h-4 w-3/4 bg-black-700 animate-pulse rounded mb-3"></div>

        {/* Price skeleton */}
        <div className="h-6 w-20 bg-black-700 animate-pulse rounded"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
