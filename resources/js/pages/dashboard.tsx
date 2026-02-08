import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/icon';
import { Users, DollarSign, ShoppingCart } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import DashboardCharts from '@/components/dashboard-charts';

type SeriesPoint = { date: string; orders: number; revenue: number };


type StatItem = { value: number; change?: string };
type DashboardStats = {
    users: StatItem;
    orders: StatItem;
    revenue: StatItem;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const page = usePage();
    const isAdmin = (page.props as any).is_admin;
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [series, setSeries] = useState<SeriesPoint[] | null>(null);

    useEffect(() => {
        let mounted = true;

        fetch('/dashboard/stats', { credentials: 'same-origin' })
            .then((res) => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then((data: DashboardStats) => {
                if (mounted) setStats(data);
            })
            .catch(() => {
                // silence failures for now
            });

        if (isAdmin) {
            fetch('/dashboard/series?days=30', { credentials: 'same-origin' })
                .then((res) => {
                    if (!res.ok) throw new Error('Network response was not ok');
                    return res.json();
                })
                .then((data: SeriesPoint[]) => {
                    if (mounted) setSeries(data);
                })
                .catch(() => {
                    // silence failures for now
                });
        }

        return () => {
            mounted = false;
        };
    }, [isAdmin]);

    const formatNumber = (n: number) => new Intl.NumberFormat('en-IN').format(n);
    const formatCurrency = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(n);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {isAdmin && (
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Payments</CardTitle>
                                <Icon iconNode={Users} className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats ? formatNumber(stats.users.value) : '—'}</div>
                                <p className="text-xs text-muted-foreground">{stats?.users.change ?? '+0%'} from last month</p>
                            </CardContent>
                        </Card>
                    )}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{isAdmin ? 'Orders' : 'My Orders'}</CardTitle>
                            <Icon iconNode={ShoppingCart} className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats ? formatNumber(stats.orders.value) : '—'}</div>
                            <p className="text-xs text-muted-foreground">{stats?.orders.change ?? '+0%'} from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{isAdmin ? 'Revenue' : 'My Payments'}</CardTitle>
                            <Icon iconNode={DollarSign} className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats ? formatCurrency(stats.revenue.value) : '—'}</div>
                            <p className="text-xs text-muted-foreground">{stats?.revenue.change ?? '+0%'} from last month</p>
                        </CardContent>
                    </Card>
                </div>

                {isAdmin && (
                    <div className="mt-2">
                        {series ? (
                            <DashboardCharts data={series} />
                        ) : (
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="h-[240px] rounded-md bg-muted/40 animate-pulse" />
                                <div className="h-[240px] rounded-md bg-muted/40 animate-pulse" />
                            </div>
                        )}
                    </div>
                )}

                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
