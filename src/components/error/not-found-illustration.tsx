export function NotFoundIllustration() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Large 404 Background Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[12rem] md:text-[16rem] font-bold text-blue-100 select-none">404</span>
      </div>

      {/* Person with Laptop Illustration */}
      <div className="relative z-10 flex justify-center items-center h-64">
        <svg
          width="200"
          height="160"
          viewBox="0 0 200 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Person sitting */}
          <ellipse cx="100" cy="140" rx="60" ry="8" fill="#E5E7EB" />

          {/* Body */}
          <rect x="85" y="80" width="30" height="40" rx="15" fill="#60A5FA" />

          {/* Head */}
          <circle cx="100" cy="65" r="18" fill="#FED7AA" />

          {/* Hair */}
          <path
            d="M82 55 C82 45, 92 40, 100 40 C108 40, 118 45, 118 55 C118 50, 110 48, 100 48 C90 48, 82 50, 82 55 Z"
            fill="#92400E"
          />

          {/* Arms */}
          <rect x="70" y="85" width="12" height="25" rx="6" fill="#FED7AA" />
          <rect x="118" y="85" width="12" height="25" rx="6" fill="#FED7AA" />

          {/* Legs */}
          <rect x="88" y="115" width="10" height="25" rx="5" fill="#1E40AF" />
          <rect x="102" y="115" width="10" height="25" rx="5" fill="#1E40AF" />

          {/* Laptop */}
          <rect x="75" y="100" width="50" height="30" rx="3" fill="#374151" />
          <rect x="78" y="103" width="44" height="24" rx="2" fill="#60A5FA" />

          {/* Question marks floating around */}
          <text x="140" y="70" fontSize="24" fill="#93C5FD">
            ?
          </text>
          <text x="50" y="90" fontSize="20" fill="#93C5FD">
            ?
          </text>
          <text x="160" y="110" fontSize="18" fill="#93C5FD">
            ?
          </text>
        </svg>
      </div>
    </div>
  )
}
