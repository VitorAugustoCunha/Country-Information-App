'use client';

import dynamic from 'next/dynamic';

// Import PopulationChart dynamically with no SSR
const PopulationChart = dynamic(() => import('./PopulationChart').then(mod => mod.PopulationChart), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse w-full h-[400px] bg-slate-100 dark:bg-slate-700 rounded-lg" />
  )
});

export function PopulationChartWrapper({ data }: { data: any }) {
  return <PopulationChart data={data} />;
}