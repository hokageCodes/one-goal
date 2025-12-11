export function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="h-20 bg-gray-200 rounded"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
      </div>
      <div className="h-3 bg-gray-200 rounded mb-6"></div>
      <div className="h-12 bg-gray-200 rounded"></div>
    </div>
  );
}

export function SkeletonStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg shadow-lg p-6 animate-pulse">
          <div className="h-12 w-12 bg-gray-200 rounded mb-2"></div>
          <div className="h-10 bg-gray-200 rounded w-20 mb-1"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonList() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg animate-pulse">
          <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="w-32 h-2 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonText({ lines = 3 }) {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="h-4 bg-gray-200 rounded" style={{ width: `${100 - i * 10}%` }}></div>
      ))}
    </div>
  );
}
