import { CountryCard } from "../../components/CountryCard";
import { getCountries } from "../../services/api";

export default async function Home() {
  const countries = await getCountries();

  return (
    <main className="container mx-auto py-8 px-4">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Countries
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Select a country to view detailed information
        </p>
      </div>

      {/* Grid of Country Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {countries.map((country) => {
          // Log individual country data
          return (
            <CountryCard 
              key={country.countryCode} 
              country={{
                ...country,
                flagUrl: country.flagUrl || `https://flagcdn.com/w640/${country.countryCode.toLowerCase()}.png`
              }} 
            />
          );
        })}
      </div>
    </main>
  );
}