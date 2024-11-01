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
  borders: {
    countryCode: string;
    name: string;
    flagUrl: string;
  }[];
  population: PopulationCount[];
  flagUrl: string;
}

  export interface PopulationCount {
    year: number;
    value: number;
  }