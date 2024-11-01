'use client';

import { useMemo, useState } from 'react';
import { PopulationCount } from '../types/country.types';

interface PopulationChartProps {
  data: PopulationCount[];
}

// Filter options
const YEAR_RANGES = [
  { label: 'Last 10 years', value: 10 },
  { label: 'Last 20 years', value: 20 },
  { label: 'Last 50 years', value: 50 },
  { label: 'All time', value: 0 }
];

const YEAR_INTERVALS = [
  { label: 'Every year', value: 1 },
  { label: 'Every 2 years', value: 2 },
  { label: 'Every 5 years', value: 5 },
  { label: 'Every 10 years', value: 10 }
];

export function PopulationChart({ data }: PopulationChartProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [yearRange, setYearRange] = useState(10);
  const [yearInterval, setYearInterval] = useState(2);

  const {
    points,
    areaPoints,
    yAxisLabels,
    xAxisLabels,
    filteredData
  } = useMemo(() => {
    // Filter data based on year range
    let processedData = [...data].sort((a, b) => a.year - b.year);
    
    if (yearRange > 0) {
      const currentYear = Math.max(...processedData.map(d => d.year));
      processedData = processedData.filter(d => d.year >= currentYear - yearRange);
    }

    // Apply interval filter
    processedData = processedData.filter((_, index) => index % yearInterval === 0);

    const minY = Math.min(...processedData.map(d => d.value));
    const maxY = Math.max(...processedData.map(d => d.value));
    const minX = processedData[0].year;
    const maxX = processedData[processedData.length - 1].year;

    // Create points for line
    const pts = processedData.map((d) => {
      const x = ((d.year - minX) / (maxX - minX)) * 900;
      const y = 280 - ((d.value - minY) / (maxY - minY)) * 260;
      return `${x},${y}`;
    }).join(' ');

    // Create points for area
    const areaPts = [
      '0,280',
      ...processedData.map((d) => {
        const x = ((d.year - minX) / (maxX - minX)) * 900;
        const y = 280 - ((d.value - minY) / (maxY - minY)) * 260;
        return `${x},${y}`;
      }),
      '900,280'
    ].join(' ');

    const yLabels = Array.from({ length: 6 }, (_, i) => {
      const value = minY + ((maxY - minY) * i) / 5;
      return {
        value,
        y: 280 - (i * 260) / 5,
        formatted: value >= 1000000
          ? `${(value / 1000000).toFixed(1)}M`
          : value >= 1000
          ? `${(value / 1000).toFixed(0)}K`
          : value.toLocaleString()
      };
    });

    const xLabels = processedData.map((d) => ({
      year: d.year,
      x: ((d.year - minX) / (maxX - minX)) * 900
    }));

    return {
      points: pts,
      areaPoints: areaPts,
      yAxisLabels: yLabels,
      xAxisLabels: xLabels,
      filteredData: processedData
    };
  }, [data, yearRange, yearInterval]);

  return (
    <div className="relative">
      {/* Filter Button */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="absolute top-0 right-0 z-10 flex items-center px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        Filters
      </button>

      {/* Filter Modal */}
      {showFilters && (
        <div className="absolute top-10 right-0 z-20 w-72 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Time Range
              </label>
              <select
                value={yearRange}
                onChange={(e) => setYearRange(Number(e.target.value))}
                className="w-full rounded-md border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white px-3 py-1.5"
              >
                {YEAR_RANGES.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Year Interval
              </label>
              <select
                value={yearInterval}
                onChange={(e) => setYearInterval(Number(e.target.value))}
                className="w-full rounded-md border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white px-3 py-1.5"
              >
                {YEAR_INTERVALS.map((interval) => (
                  <option key={interval.value} value={interval.value}>
                    {interval.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="w-full h-[400px] bg-white dark:bg-slate-800 rounded-lg p-4">
        <svg
          viewBox="0 0 1000 400"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Gradient definition */}
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {yAxisLabels.map(({ y }, i) => (
            <line
              key={`grid-${i}`}
              x1="50"
              y1={y}
              x2="950"
              y2={y}
              className="stroke-slate-100 dark:stroke-slate-700"
              strokeWidth="1"
              strokeDasharray="4,6"
            />
          ))}

          {/* Axes */}
          <line
            x1="50"
            y1="280"
            x2="950"
            y2="280"
            className="stroke-slate-300 dark:stroke-slate-600"
            strokeWidth="1"
          />
          <line
            x1="50"
            y1="20"
            x2="50"
            y2="280"
            className="stroke-slate-300 dark:stroke-slate-600"
            strokeWidth="1"
          />

          {/* Population area and line */}
          <g transform="translate(50, 0)">
            <polygon
              points={areaPoints}
              fill="url(#areaGradient)"
              className="transition-opacity duration-300"
            />
            
            <polyline
              points={points}
              fill="none"
              className="stroke-blue-500 dark:stroke-blue-400"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data points */}
            {filteredData.map((d, i) => {
              const x = ((d.year - filteredData[0].year) / 
                        (filteredData[filteredData.length - 1].year - filteredData[0].year)) * 900;
              const y = 280 - ((d.value - Math.min(...filteredData.map(d => d.value))) / 
                             (Math.max(...filteredData.map(d => d.value)) - 
                              Math.min(...filteredData.map(d => d.value)))) * 260;
              return (
                <g key={i} className="transition-transform duration-150 hover:scale-150">
                  <circle
                    cx={x}
                    cy={y}
                    r="4"
                    className="fill-white stroke-blue-500 dark:stroke-blue-400"
                    strokeWidth="2"
                  >
                    <title>{`${d.year}: ${d.value.toLocaleString()} people`}</title>
                  </circle>
                </g>
              );
            })}
          </g>

          {/* Labels */}
          {yAxisLabels.map(({ y, formatted }, i) => (
            <text
              key={`label-${i}`}
              x="40"
              y={y}
              className="text-xs fill-slate-500 dark:fill-slate-400"
              textAnchor="end"
              dominantBaseline="middle"
            >
              {formatted}
            </text>
          ))}

          {xAxisLabels.map(({ year, x }, i) => (
            <text
              key={`year-${i}`}
              x={x + 50}
              y="300"
              className="text-xs fill-slate-500 dark:fill-slate-400"
              textAnchor="middle"
            >
              {year}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}