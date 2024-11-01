import { Country, CountryInfo } from "../types/country.types";

const API_BASE_URL = "http://localhost:3001/api";

export async function getCountries(): Promise<Country[]> {
    const response = await fetch(`${API_BASE_URL}/countries`, {
      next: {
        revalidate: 3600
      }
    });
    
    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    
    // Log para debug
    console.log('API Response:', data);

    return data.map((country: any) => ({
      countryCode: country.countryCode,
      name: country.name,
      flagUrl: country.flagUrl || `https://flagcdn.com/w640/${country.countryCode.toLowerCase()}.png`
    }));
}

export async function getCountryInfo(countryCode: string): Promise<CountryInfo> {
    const response = await fetch(`${API_BASE_URL}/countries/${countryCode}`, {
      next: {
        revalidate: 3600 
      }
    });
    
    if (!response.ok) {
      return {} as CountryInfo;
    }
    
    return response.json();
  }