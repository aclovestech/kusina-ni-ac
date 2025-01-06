export function ProductDetailsSkeleton() {
  return (
    <>
      <div className="skeleton mx-4 my-2 h-6 w-64"></div>

      <div className="mb-8 mt-6 flex flex-col justify-center px-4 md:mb-0 md:flex-row">
        <figure className="w-full self-center justify-self-center">
          <div className="skeleton h-40 w-full md:h-72"></div>
        </figure>

        <div className="mt-4 w-full self-center px-2 md:mt-0 md:w-1/2 md:px-4">
          <div className="skeleton h-10 w-32"></div>
          <div className="skeleton mt-2 h-6 w-14"></div>
          <div className="skeleton mt-3 h-14 w-full"></div>

          <div className="mt-4 flex items-center justify-center">
            <div className="btn skeleton"></div>
            <div className="skeleton w-16"></div>
            <div className="btn skeleton"></div>
          </div>

          <div className="btn skeleton mt-6 w-full"></div>
        </div>
      </div>
    </>
  );
}
