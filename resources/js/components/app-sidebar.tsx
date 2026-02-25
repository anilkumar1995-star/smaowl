import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard, services } from '@/routes';
import orders from '@/routes/orders';
import payments from '@/routes/payments';
import adminPayments from '@/routes/admin/payments';
import adminDeveloper from '@/routes/admin';
import { usePage } from '@inertiajs/react';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, CreditCard, Folder, LayoutGrid, ShoppingCart, Wallet } from 'lucide-react';
import AppLogo from './app-logo';

const baseNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Ledger',
        href: payments.ledger().url,
        icon: CreditCard,
    },
    {
        title: 'Services',
        href: services().url,
        icon: Folder,
    },
    {
        title: 'Orders',
        href: orders.index().url,
        icon: ShoppingCart,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { props } = usePage<any>();
    // Support both Inertia shared `auth.isAdmin` and page-level `is_admin` prop
    const isAdmin = props?.auth?.isAdmin || props?.is_admin || false;

    const mainNavItems = [...baseNavItems];
 if (isAdmin == false) {
    // Wallet Load for regular users
    mainNavItems.push({
        title: 'Wallet Load',
        href: payments.manual.create().url,
        icon: Wallet,
    });
}

    // Admin-only management links
    if (isAdmin) {
        mainNavItems.push({
            title: 'Manage Wallet Loads',
            href: adminPayments.index().url,
            icon: Wallet,
        });

        
    }
    // Developer Controls (feature-flagged)
        const showDev = props?.developer_controls || false;
        if (showDev) {
            mainNavItems.push({
                title: 'Developer Controls',
                href: adminDeveloper.developer.keys().url,
                icon: Wallet,
            });
        }

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
