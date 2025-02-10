'use client';

import { NewspaperIcon, ArrowTrendingUpIcon, ChartBarIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { ComponentType } from 'react';

interface Insight {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  category: string;
  date: string;
}

const insights: Insight[] = [
  {
    title: 'MIDC Industrial Growth Report 2025',
    description: 'Analysis of industrial growth trends across Maharashtra\'s major MIDC regions.',
    icon: ArrowTrendingUpIcon,
    category: 'Market Analysis',
    date: 'Feb 2025'
  },
  {
    title: 'Top Emerging Industrial Hubs',
    description: 'Detailed overview of upcoming industrial areas and their potential.',
    icon: BuildingOfficeIcon,
    category: 'Location Insights',
    date: 'Jan 2025'
  },
  {
    title: 'Industrial Real Estate Market Trends',
    description: 'Current market trends, pricing analysis, and future projections.',
    icon: ChartBarIcon,
    category: 'Market Trends',
    date: 'Dec 2024'
  },
  {
    title: 'Investment Opportunities in MIDC',
    description: 'Guide to investment opportunities in different MIDC regions.',
    icon: NewspaperIcon,
    category: 'Investment',
    date: 'Nov 2024'
  }
];

export default function InsightsPage() {
  return (
    <main className="min-h-screen py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Market Insights</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay informed with the latest trends, analysis, and insights about Maharashtra's industrial real estate market.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <motion.div
                key={insight.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                      {insight.category}
                    </span>
                    <span className="text-sm text-gray-500">{insight.date}</span>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {insight.title}
                      </h3>
                      <p className="text-gray-600">
                        {insight.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button className="text-primary hover:text-primary-dark font-medium text-sm flex items-center space-x-1">
                      <span>Read more</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
