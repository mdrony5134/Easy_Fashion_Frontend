export function ProductDetailsSkeleton() {
  return (
    <div className="mt-6 grid gap-10 lg:grid-cols-2">
      <div className="animate-pulse">
        <div className="bg-gray-200 aspect-4/5 w-full rounded-xl"></div>
        <div className="mt-3 grid grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-200 aspect-square w-full rounded-xl"></div>
          ))}
        </div>
      </div>

      <div className="animate-pulse">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
          <div className="h-6 bg-gray-200 rounded-full w-24"></div>
        </div>

        <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>

        <div className="h-10 bg-gray-200 rounded w-1/3 mb-5"></div>

        <div className="space-y-2 mb-7">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-11/12"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5"></div>
        </div>

        <div className="mt-7">
          <div className="h-4 bg-gray-200 rounded w-48 mb-3"></div>
          <div className="mt-3 flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 min-w-12 w-16 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-4">
          <div className="h-12 w-32 bg-gray-200 rounded-lg"></div>
          <div className="h-12 flex-1 bg-gray-200 rounded-lg"></div>
        </div>

        <div className="mt-8 h-24 bg-gray-200 rounded-xl w-full"></div>
      </div>
    </div>
  );
}
