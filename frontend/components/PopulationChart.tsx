'use client';

import { useMemo } from 'react';
import { PopulationCount } from '../types/country.types';

interface PopulationChartProps {
  data: PopulationCount[];
}

export function PopulationChart({ data }: PopulationChartProps) {
  // Memoize calculations
  const {
    points,
    minValue,
    maxValue,
    minYear,
    maxYear,
    yAxisLabels,
    xAxisLabels
  } = useMemo(() => {
    // Sort data by year
    const sortedData = [...data].sort((a, b) => a.year - b.year);
    
    // Calculate boundaries
    const minY = Math.min(...sortedData.map(d => d.value));
    const maxY = Math.max(...sortedData.map(d => d.value));
    const minX = Math.min(...sortedData.map(d => d.year));
    const maxX = Math.max(...sortedData.map(d => d.year));

    // Create points for the polyline
    const pts = sortedData.map((d) => {
      const x = ((d.year - minX) / (maxX - minX)) * 900;
      const y = 300 - ((d.value - minY) / (maxY - minY)) * 280;
      return `${x},${y}`;
    }).join(' ');

    // Create Y-axis labels
    const yLabels = Array.from({ length: 5 }, (_, i) => {
      const value = minY + ((maxY - minY) * i) / 4;
      return {
        value,
        y: 300 - (i * 280) / 4,
        formatted: value >= 1000000
          ? `${(value / 1000000).toFixed(1)}M`
          : value.toLocaleString()
      };
    });

    // Create X-axis labels (show every other year if too many points)
    const step = sortedData.length > 10 ? 2 : 1;
    const xLabels = sortedData.filter((_, i) => i % step === 0).map((d) => ({
      year: d.year,
      x: ((d.year - minX) / (maxX - minX)) * 900 + 50
    }));

    return {
      points: pts,
      minValue: minY,
      maxValue: maxY,
      minYear: minX,
      maxYear: maxX,
      yAxisLabels: yLabels,
      xAxisLabels: xLabels
    };
  }, [data]);

  return (
    <div className="w-full h-[400px] relative bg-white p-4">
      <svg
        viewBox="0 0 1000 400"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        {/* Grid lines */}
        {yAxisLabels.map(({ y }, i) => (
          <line
            key={`grid-${i}`}
            x1="50"
            y1={y}
            x2="950"
            y2={y}
            className="stroke-gray-200"
            strokeWidth="1"
          />
        ))}

        {/* Y-axis labels */}
        {yAxisLabels.map(({ y, formatted }, i) => (
          <text
            key={`label-${i}`}
            x="40"
            y={y}
            className="text-sm fill-gray-500"
            textAnchor="end"
            dominantBaseline="middle"
          >
            {formatted}
          </text>
        ))}

        {/* X-axis labels */}
        {xAxisLabels.map(({ year, x }, i) => (
          <text
            key={`year-${i}`}
            x={x}
            y="340"
            className="text-sm fill-gray-500"
            textAnchor="middle"
          >
            {year}
          </text>
        ))}

        {/* Axes */}
        <line
          x1="50"
          y1="300"
          x2="950"
          y2="300"
          className="stroke-gray-300"
          strokeWidth="1"
        />
        <line
          x1="50"
          y1="20"
          x2="50"
          y2="300"
          className="stroke-gray-300"
          strokeWidth="1"
        />

        {/* Population line */}
        <g transform="translate(50, 0)">
          <polyline
            points={points}
            fill="none"
            className="stroke-blue-500"
            strokeWidth="2"
          />
          {/* Data points */}
          {data.map((d, i) => {
            const x = ((d.year - minYear) / (maxYear - minYear)) * 900;
            const y = 300 - ((d.value - minValue) / (maxValue - minValue)) * 280;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="4"
                className="fill-blue-500 hover:fill-blue-600"
              >
                <title>{`${d.year}: ${d.value.toLocaleString()}`}</title>
              </circle>
            );
          })}
        </g>
      </svg>
    </div>
  );
}