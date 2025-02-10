import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

interface SEOMetricsCardProps {
  title: string;
  value: number | string;
  change: number;
  timeframe: string;
}

export default function SEOMetricsCard({ title, value, change, timeframe }: SEOMetricsCardProps) {
  const isPositive = change >= 0;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <p className={`ml-2 flex items-baseline text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? (
            <ArrowUpIcon className="self-center flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
          ) : (
            <ArrowDownIcon className="self-center flex-shrink-0 h-5 w-5 text-red-500" aria-hidden="true" />
          )}
          <span className="ml-1">{Math.abs(change)}%</span>
        </p>
      </div>
      <p className="mt-1 text-sm text-gray-500">{timeframe}</p>
    </div>
  );
}
