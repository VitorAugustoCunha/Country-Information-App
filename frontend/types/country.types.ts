// src/types/country.types.ts
export interface Country {
    countryCode: string;
    name: string;
    flagUrl: string;
  }
  
  export interface CountryInfo {
    commonName: string;
    officialName: string;
    countryCode: string;
    region: string;
    borders: Country[];
    population: PopulationCount[];
    flagUrl: string;
  }
  
  export interface PopulationCount {
    year: number;
    value: number;
  }