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
    const currentTitle = breadcrumbs?.length ? breadcrumbs[breadcrumbs.length - 1].title : '';

    return (
        <header className="flex flex-wrap h-12 sm:h-16 min-w-0 shrink-0 items-center justify-between border-b border-sidebar-border/50 px-3 sm:px-6 md:px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 min-w-0 flex-1">
                <SidebarTrigger className="-ml-1" />
                <div className="hidden sm:block">
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
                <div className="sm:hidden text-sm font-medium truncate min-w-0 overflow-hidden">{currentTitle}</div>
            </div>
            <div className="flex items-center gap-3 min-w-0 justify-end">
                {/* Fund Display - allow wrapping and truncation on small screens */}
                <div className="hidden sm:flex soft-card flex items-center gap-3 min-w-0 max-w-xs">
                    <div className="flex items-center gap-2 min-w-0">
                        <Wallet className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <div className="flex flex-col min-w-0">
                            <span className="text-xs text-muted-foreground font-medium hidden sm:block">Available</span>
                            <span className="text-sm font-bold text-green-600 dark:text-green-400 truncate">{formatCurrency(availableBalance)}</span>
                        </div>
                    </div>

                    <div className="w-px h-6 bg-border hidden md:block" />

                    {/* Hide invested on small and tablet; only show on md+ */}
                    <div className="hidden md:flex items-center gap-2 min-w-0">
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

                            <div className="ml-0 sm:ml-2 mt-0">
                        <Button
                            size="sm"
                            variant="outline"
                            className="h-7 px-2 bg-white/50 hover:bg-white/80 dark:bg-gray-800/50 dark:hover:bg-gray-800/80 border-green-300 dark:border-green-700"
                            asChild
                        >
                            <Link href="/payments/add-funds" className="flex items-center">
                                <Plus className="w-3 h-3 mr-1" />
                                        <span className="hidden md:inline">Add</span>
                            </Link>
                        </Button>
                    </div>
                </div>

                        <div className="ml-2 flex-shrink-0">
                            <NavUser />
                        </div>
            </div>
        </header>
    );
}
