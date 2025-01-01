export function ProductCardSkeleton() {
  return (
    <div className="card skeleton bg-base-300 shadow-xl">
      <div className="card-body skeleton">
        <div className="badge skeleton w-20"></div>
        <div className="card-title skeleton mt-3 w-24"></div>
        <div className="skeleton h-20 w-full"></div>
        <div className="card-actions justify-end">
          <div className="btn skeleton mt-4 w-20"></div>
        </div>
      </div>
    </div>
  );
}
