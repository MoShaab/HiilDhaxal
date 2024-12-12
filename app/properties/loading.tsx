export default function Loading() {
    return (
      <div className="w-full min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-50">
        <div className="container mx-auto px-4 py-6 md:py-10 animate-pulse">
          {/* Header */}
          <div className="h-10 w-1/3 bg-gray-300 rounded"></div>
  
          {/* Navigation Links */}
          <div className="flex gap-4 mt-4">
            <div className="h-10 w-36 bg-gray-300 rounded"></div>
            <div className="h-10 w-24 bg-gray-300 rounded"></div>
          </div>
  
          {/* Grid Content Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                {/* Image Skeleton */}
                <div className="h-48 w-full bg-gray-300 rounded-md"></div>
                {/* Text Skeleton */}
                <div className="mt-4 h-4 w-3/4 bg-gray-300 rounded"></div>
                <div className="mt-2 h-4 w-1/2 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
  
          {/* Footer */}
          <div className="mt-16">
            <div className="h-5 w-1/2 bg-gray-300 rounded mx-auto"></div>
            <div className="h-5 w-1/3 bg-gray-300 rounded mx-auto mt-2"></div>
          </div>
        </div>
      </div>
    );
  }
  