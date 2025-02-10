'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/layouts/AdminLayout';
import SEOMetricsCard from '@/components/admin/seo/SEOMetricsCard';
import SEOPageAnalytics from '@/components/admin/seo/SEOPageAnalytics';
import SEOKeywordsManager from '@/components/admin/seo/SEOKeywordsManager';
import SEOMetaManager from '@/components/admin/seo/SEOMetaManager';

export default function SEODashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    totalPageViews: 0,
    averagePosition: 0,
    clickThroughRate: 0,
    indexedPages: 0
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated' && session?.user?.role !== 'admin') {
      router.push('/');
    } else if (status === 'authenticated') {
      fetchSEOMetrics();
    }
  }, [status, session, router]);

  const fetchSEOMetrics = async () => {
    try {
      // In a real application, this would fetch from your analytics API
      const response = await fetch('/api/admin/seo/metrics');
      const data = await response.json();
      setMetrics(data);
    } catch (error) {
      console.error('Error fetching SEO metrics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-8">SEO Dashboard</h1>
        
        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <SEOMetricsCard
            title="Total Page Views"
            value={metrics.totalPageViews}
            change={+5.2}
            timeframe="Last 30 days"
          />
          <SEOMetricsCard
            title="Average Position"
            value={metrics.averagePosition}
            change={-0.8}
            timeframe="Last 30 days"
          />
          <SEOMetricsCard
            title="Click Through Rate"
            value={`${metrics.clickThroughRate}%`}
            change={+1.5}
            timeframe="Last 30 days"
          />
          <SEOMetricsCard
            title="Indexed Pages"
            value={metrics.indexedPages}
            change={+3}
            timeframe="Last 30 days"
          />
        </div>

        {/* Page Analytics */}
        <div className="mb-8">
          <SEOPageAnalytics />
        </div>

        {/* Keywords Manager */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SEOKeywordsManager />
          <SEOMetaManager />
        </div>
      </div>
    </AdminLayout>
  );
}
