"client";
import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { getCountryInfo } from "../../../../services/api";
import { PopulationChart } from "../../../../components/PopulationChart";

export default function CountryPage({
  params,
}: {
  params: Promise<{ code: string }> | { code: string };
}) {
  const resolvedParams = use(Promise.resolve(params));
  const country = use(getCountryInfo(resolvedParams.code));

  return (
    <div className="min-h-screen bg-background">
      <main className="container py-8">
        <Link
          href="/"
          className="btn-secondary mb-8 inline-flex items-center gap-2"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="mr-1"
          >
            <path
              d="M6.5 12.5L2 8m0 0l4.5-4.5M2 8h12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Countries
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="card p-6">
              {country.flagUrl && (
                <div className="relative w-full h-48 md:h-64 mb-6">
                  <Image
                    src={country.flagUrl}
                    alt={`${country.commonName} flag`}
                    fill
                    className="object-contain rounded-lg"
                    unoptimized
                  />
                </div>
              )}

              <h1 className="text-3xl font-bold text-foreground">
                {country.commonName}
              </h1>
              <p className="text-muted mt-2">{country.officialName}</p>
              <p className="mt-4 text-foreground">
                <span className="font-medium">Region:</span> {country.region}
              </p>
            </div>

            {country.borders.length > 0 && (
              <div className="card p-6">
                <h2 className="text-xl font-semibold mb-4">Border Countries</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {country.borders.map((border) => (
                    <Link
                      key={border.countryCode}
                      href={`/country/${border.countryCode}`}
                      className="group flex items-center p-3 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all duration-200"
                    >
                      {/* Miniatura da bandeira */}
                      <div className="relative w-8 h-6 mr-3 overflow-hidden rounded shadow-sm">
                        <Image
                          src={`https://flagcdn.com/w640/${border.countryCode.toLowerCase()}.png`}
                          alt={`${border.name} flag`}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>

                      {/* Nome do país */}
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-primary transition-colors">
                        {border.name}
                      </span>

                      {/* Ícone de seta */}
                      <svg
                        className="w-4 h-4 ml-auto transform translate-x-0 group-hover:translate-x-1 opacity-0 group-hover:opacity-100 transition-all duration-200 text-primary"
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

          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-6">Population Over Time</h2>
            <PopulationChart data={country.population} />
          </div>
        </div>
      </main>
    </div>
  );
}
