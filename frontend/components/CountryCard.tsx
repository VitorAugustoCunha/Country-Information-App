import Link from "next/link";
import Image from "next/image";
import { Country } from "../types/country.types";

export function CountryCard({ country }: { country: Country }) {
    const flagUrl = country.flagUrl || `https://flagcdn.com/w640/${country.countryCode.toLowerCase()}.png`;

    return (
        <Link
          href={`/country/${country.countryCode}`}
          className="group block overflow-hidden rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary transition-all duration-300"
        >
          {/* Flag Image Container */}
          <div className="relative w-full h-48 md:h-64 mb-4">
            <Image
              src={flagUrl}
              alt={`${country.name} flag`}
              fill
              className="object-cover rounded-t-xl"
              unoptimized
            />
          </div>
          
          {/* Card Content Container */}
          <div className="p-4">
            <div className="flex items-center  justify-between mb-2">
              {/* Country Name */}
              <h2 className="text-lg me-5 font-semibold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors line-clamp-1">
                {country.name}
              </h2>
              {" - "}
              {/* Country Code Badge */}
              <span className="px-2 py-0.5 text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                {country.countryCode}
              </span>
            </div>

            {/* View Details Link */}
            <div className="flex items-center text-sm text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors">
              <span>View details</span>
              <svg 
                className="w-4 h-4 ml-1 transform translate-x-0 group-hover:translate-x-1 transition-transform"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </div>
          </div>
        </Link>
    );
}

export function CountryCardSkeleton() {
  return (
    <div className="rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      <div className="relative w-full h-40 bg-slate-200 dark:bg-slate-700" />
      <div className="p-4">
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-2">
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
            <div className="w-10 h-5 bg-slate-200 dark:bg-slate-700 rounded-full" />
          </div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
        </div>
      </div>
    </div>
  );
}