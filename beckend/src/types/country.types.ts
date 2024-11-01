export interface Country {
    countryCode: string;
    name: string;
  }
  
  export interface CountryInfo {
    commonName: string;
    officialName: string;
    countryCode: string;
    region: string;
    borders: Country[];
    population: PopulationCount[];
  }
  
  export interface PopulationCount {
    year: number;
    value: number;
  }
  
  export interface PopulationData {
    populationCounts: PopulationCount[];
  }
  
  export interface FlagData {
    flag: string;
  }
  
  export interface DetailedCountryInfo extends CountryInfo {
    population: PopulationCount[];
    flagUrl: string;
  }