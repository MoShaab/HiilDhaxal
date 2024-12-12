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
  
          {/* Content Skeleton */}
          <div className="mt-8">
            <div className="h-64 w-full bg-gray-300 rounded-lg"></div>
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
  