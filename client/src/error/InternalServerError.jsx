export default function InternalServerError() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex w-full max-w-7xl mx-auto p-8 sm:p-12 md:p-16 flex-col md:flex-row items-center md:items-start justify-center">
        {/* Airbnb Logo */}
        <div className="absolute top-8 left-8 flex items-center">
          <svg
            className="h-8 w-8 text-pink-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 2a8 8 0 100 16 8 8 0 000-16zM8.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L10 10.586 8.707 9.293z"
              clipRule="evenodd"
              fillRule="evenodd"
            ></path>
          </svg>
          <span className="ml-2 text-2xl font-bold text-gray-800">airbnb</span>
        </div>

        {/* Text and Links Section */}
        <div className="flex flex-col items-center md:items-start text-left md:w-1/2">
          <h1 className="text-6xl font-bold text-gray-800 mt-20 md:mt-0">
            Server Error!
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Something went wrong on our end. We're working to fix it.
          </p>
          <p className="mt-2 text-sm text-gray-400">Error code: 500</p>

          <div className="mt-8">
            <h3 className="font-semibold text-gray-800 mb-2">
              Here are some helpful links instead:
            </h3>
            <ul className="text-blue-600 space-y-2">
              <li>
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Search
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Help
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Illustration Section */}
        <div className="flex items-center justify-center mt-12 md:mt-0 md:w-1/2">
          <svg
            className="w-64 h-64 sm:w-80 sm:h-80 text-gray-300"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
              fill="currentColor"
              opacity=".5"
            ></path>
            <path d="M12 16a4 4 0 100-8 4 4 0 000 8z" fill="white"></path>
            <path
              d="M15 13a1 1 0 11-2 0 1 1 0 012 0z"
              fill="currentColor"
            ></path>
            <path
              d="M9 13a1 1 0 11-2 0 1 1 0 012 0z"
              fill="currentColor"
            ></path>
            <path
              d="M12 17.5a2.5 2.5 0 01-2.5-2.5h-1a3.5 3.5 0 007 0h-1a2.5 2.5 0 01-2.5 2.5z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
