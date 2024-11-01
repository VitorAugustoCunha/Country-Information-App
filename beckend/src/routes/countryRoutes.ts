// src/routes/countryRoutes.ts
import { Router, Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import { DetailedCountryInfo } from '../types/country.types';

export const countryRouter: Router = Router();

// Função para validar e construir URLs
const buildUrl = (baseUrl: string | undefined, path: string): string => {
  if (!baseUrl) {
    throw new Error('Base URL is not defined in environment variables');
  }
  // Remove barras duplicadas e garante formato correto
  const cleanBaseUrl = baseUrl.replace(/\/+$/, '');
  const cleanPath = path.replace(/^\/+/, '');
  return `${cleanBaseUrl}/${cleanPath}`;
};

// Melhor tratamento de erros
const handleError = (error: AxiosError | Error | any, res: Response): void => {
  console.error('Error details:', {
    name: error.name,
    message: error.message,
    stack: error.stack,
    config: error.config,
    response: error.response?.data
  });

  const statusCode = error.response?.status || 500;
  const message = error.message || 'Internal server error';
  
  res.status(statusCode).json({ 
    message,
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
};

// Get all countries
countryRouter.get('/', async (_req: Request, res: Response) => {
    try {
      // Get basic country list
      const countriesResponse = await axios.get(
        `${process.env.DATE_NAGER_API}/AvailableCountries`
      );
  
      // Get flags with proper URL and using POST method as required by the API
      const flagsResponse = await axios.get(
        `${process.env.COUNTRIES_NOW_API}/countries/flag/images`
      );
  
      // Debug logs
      console.log('Countries received:', countriesResponse.data.length);
      console.log('Flags received:', flagsResponse.data.data.length);
  
      // Create a map of normalized country names to flag URLs
      const flagMap = flagsResponse.data.data.reduce((acc: Record<string, string>, country: any) => {
        // Normalize country names to handle differences in naming
        const normalizedName = country.name.toLowerCase().trim();
        acc[normalizedName] = country.flag;
        return acc;
      }, {});
  
      // Combine the data with normalized names for matching
      const countriesWithFlags = countriesResponse.data.map((country: any) => {
        const normalizedName = country.name.toLowerCase().trim();
        const flagUrl = flagMap[normalizedName];
  
        // Debug log for missing flags
        if (!flagUrl) {
          console.log(`No flag found for country: ${country.name}`);
        }
  
        return {
          ...country,
          flagUrl: flagUrl || null
        };
      });
  
      res.json(countriesWithFlags);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error fetching countries',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

// Get country details
countryRouter.get('/:countryCode', async (req: Request, res: Response) => {
  const { countryCode } = req.params;
  
  try {
    if (!countryCode) {
      console.log('Country code is required');
    }

    // 1. Get country info
    const countryInfoUrl = buildUrl(process.env.DATE_NAGER_API, `CountryInfo/${countryCode}`);
    const countryInfoResponse = await axios.get(countryInfoUrl);

    // 2. Get population data
    const populationUrl = buildUrl(process.env.COUNTRIES_NOW_API, 'countries/population');
    const populationResponse = await axios.post(populationUrl, {
      country: countryInfoResponse.data.commonName
    });

    // 3. Get flag URL
    const flagUrl = buildUrl(process.env.COUNTRIES_NOW_API, 'countries/flag/images');
    console.log('Fetching flag from:', flagUrl);
    const flagResponse = await axios.post(flagUrl, {
      country: countryInfoResponse.data.commonName
    });

    const countryData: DetailedCountryInfo = {
      ...countryInfoResponse.data,
      population: populationResponse.data.data.populationCounts,
      flagUrl: flagResponse.data.data.flag
    };

    res.json(countryData);
  } catch (error) {
    handleError(error, res);
  }
});