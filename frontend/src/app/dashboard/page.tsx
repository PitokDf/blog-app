import { Metadata } from 'next';
import { DashboardStats } from '@/components/dashboard/dashboard-stats';
import { DashboardCharts } from '@/components/dashboard/dashboard-charts';
import { DashboardRecent } from '@/components/dashboard/dashboard-recent';

export const metadata: Metadata = {
    title: 'Dashboard | Content Hub Admin',
    description: 'Overview of your content hub stats and activity',
};

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                    Overview of your content hub stats and recent activity
                </p>
            </div>
            <DashboardStats />
            <DashboardCharts />
            <DashboardRecent />
        </div>
    );
}