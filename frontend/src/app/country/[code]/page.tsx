import Link from "next/link";
import Image from "next/image";
import { getCountryInfo } from "../../../../services/api";
import { PopulationChartWrapper } from "../../../../components/PopulationChartWrapper";

interface PageProps {
  params: {
    code: string;
  };
}

export default async function CountryPage({ params }: PageProps) {
  if (!params || !params.code) {
    throw new Error('Country code is required');
  }

  try {
    const country = await getCountryInfo(params.code);

    if (!country) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg text-slate-500 dark:text-slate-400">
            Country not found
          </p>
        </div>
      )
    }

    // Log para debug
    console.log('Country data:', {
      code: params.code,
      name: country.commonName,
      borders: country.borders?.length,
      population: country.population?.length
    });

    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        <main className="container py-12 px-4">
          {/* Back Navigation */}
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors mb-8 group"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="mr-2 transform group-hover:-translate-x-1 transition-transform"
            >
              <path
                d="M19 12H5M12 19l-7-7 7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Countries
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Country Information Section */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                {/* Flag Container */}
                {country.flagUrl && (
                  <div className="relative w-full h-64 lg:h-72 border-b border-slate-200 dark:border-slate-700">
                    <Image
                      src={country.flagUrl}
                      alt={`${country.commonName} flag`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                )}
                
                {/* Country Details */}
                <div className="p-6">
                  <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    {country.commonName}
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400 mb-4">
                    {country.officialName}
                  </p>
                  <div className="flex items-center text-slate-700 dark:text-slate-300">
                    <svg 
                      className="w-5 h-5 mr-2 opacity-70" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
                      />
                    </svg>
                    <span className="font-medium">Region:</span>
                    <span className="ml-2">{country.region}</span>
                  </div>
                </div>
              </div>

              {/* Border Countries Section */}
              {country.borders && country.borders.length > 0 && (
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Border Countries
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {country.borders.map((border) => (
                      <Link
                        key={border.countryCode}
                        href={`/country/${border.countryCode}`}
                        className="group flex items-center p-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-900/50 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-700 transition-all duration-200"
                      >
                        {/* Flag Thumbnail */}
                        <div className="relative w-10 h-7 overflow-hidden rounded shadow-sm">
                          <Image
                            src={`https://flagcdn.com/w640/${border.countryCode.toLowerCase()}.png`}
                            alt={`${border.name || border.countryCode} flag`}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        
                        {/* Country Name */}
                        <span className="ml-3 text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors flex-1 truncate">
                          {border.name || border.countryCode}
                        </span>
                        
                        <svg
                          className="w-4 h-4 text-slate-400 group-hover:text-primary transform translate-x-0 group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100"
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
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Population Chart Section */}
            {country.population && country.population.length > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                  Population Over Time
                </h2>
                <PopulationChartWrapper data={country.population} />
              </div>
            )}
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error loading country:', error);
    throw error; // This will be caught by the error boundary
  }
}