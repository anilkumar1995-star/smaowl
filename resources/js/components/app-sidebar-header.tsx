import { Breadcrumbs } from '@/components/breadcrumbs';
import { NavUser } from '@/components/nav-user';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { formatCurrency } from '@/lib/currency';
import { Plus, Wallet } from 'lucide-react';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const { auth } = usePage().props;
    const user = auth.user;
    const availableBalance = user?.balance || 0;
    const [invested, setInvested] = useState<number>(Number(user?.totalInvested ?? 0));

    useEffect(() => {
        try {
            // Prefer server-provided value, but fallback to the initial Inertia payload if missing
            const initial = (globalThis as any).__INITIAL_PAGE__?.props?.auth?.user?.totalInvested;
            const serverVal = user?.totalInvested ?? undefined;
            if ((serverVal === undefined || Number(serverVal) === 0) && initial !== undefined) {
                setInvested(Number(initial));
            } else {
                setInvested(Number(serverVal ?? 0));
            }
            // eslint-disable-next-line no-console
            console.debug('[AppSidebarHeader] user:', user, 'invested:', Number(serverVal ?? initial ?? 0));
        } catch (e) {
            // ignore
        }
    }, [user]);
    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            <div className="flex items-center gap-3">
                {/* Fund Display - allow wrapping and truncation on small screens */}
                       <div className="soft-card flex items-center gap-4">
                    <div className="flex items-center gap-2 min-w-0">
                        <Wallet className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <div className="flex flex-col min-w-0">
                            <span className="text-xs text-muted-foreground font-medium">Available</span>
                            <span className="text-sm font-bold text-green-600 dark:text-green-400 truncate">{formatCurrency(availableBalance)}</span>
                        </div>
                    </div>

                    <div className="w-px h-6 bg-border hidden sm:block" />

                    {/* Hide invested on small screens to save space */}
                    <div className="hidden sm:flex items-center gap-2 min-w-0">
                        {invested > 0 ? (
                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                        ) : (
                            <div className="w-2 h-2" />
                        )}
                        <div className="flex flex-col min-w-0">
                            <span className="text-xs text-muted-foreground font-medium">Invested</span>
                            <span className="text-sm font-bold text-blue-600 dark:text-blue-400 truncate">{formatCurrency(invested)}</span>
                        </div>
                    </div>

                    <div className="ml-0 sm:ml-2 mt-2 sm:mt-0 flex-shrink-0">
                        <Button
                            size="sm"
                            variant="outline"
                            className="h-7 px-2 bg-white/50 hover:bg-white/80 dark:bg-gray-800/50 dark:hover:bg-gray-800/80 border-green-300 dark:border-green-700"
                            asChild
                        >
                            <Link href="/payments/add-funds">
                                <Plus className="w-3 h-3 mr-1" />
                                Add
                            </Link>
                        </Button>
                    </div>
                </div>

                <NavUser />
            </div>
        </header>
    );
}
