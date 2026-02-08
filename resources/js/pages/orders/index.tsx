import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import FilterBar from '@/components/filters/FilterBar';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import orders from '@/routes/orders';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Orders',
        href: orders.index().url,
    },
];

interface Order {
    id: number;
    service: string;
    service_name?: string | null;
    link: string;
    quantity: number;
    cost: string;
    external_id?: string | null;
    status: string;
    created_at: string;
    user?: {
        id: number;
        name: string;
        email: string;
    };
}

interface OrdersProps {
    orders: {
        data: Order[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        prev_page_url?: string | null;
        next_page_url?: string | null;
        path?: string;
    };
    filters?: Record<string, any>;
}

export default function OrdersIndex({ orders, filters }: OrdersProps) {
    const { props } = usePage<any>();
    const isAdmin = props?.auth?.isAdmin;

    const getStatusBadge = (status: string) => {
        const variants = {
            success: 'default',
            pending: 'secondary',
            failed: 'destructive',
        } as const;

        return (
            <Badge variant={variants[status as keyof typeof variants] || 'outline'}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
        );
    };

    const prevPage = orders.current_page > 1 ? orders.current_page - 1 : null;
    const nextPage = orders.current_page < orders.last_page ? orders.current_page + 1 : null;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Orders" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Orders</h1>
                        <p className="text-muted-foreground">List of your placed orders</p>
                    </div>
                    {/* Hide create order button for admin users */}
                    {(!props?.auth?.isAdmin) && (
                        <Button asChild>
                            <Link href='orders/create'>Create Order</Link>
                        </Button>
                    )}
                </div>

                                {/* Filters - modern pill-style responsive grid */}
                                <FilterBar>
                                    <form method="get" className="grid grid-cols-1 md:grid-cols-12 gap-3 my-0">
                    <div className="md:col-span-2">
                        <label className="text-xs text-gray-300">Status</label>
                        <select name="status" defaultValue={typeof filters !== 'undefined' && filters.status ? String(filters.status) : ''} className="w-full rounded-full border border-neutral-800 bg-transparent px-4 py-3 text-sm text-white placeholder:text-gray-400">
                            <option value="">All</option>
                            <option value="success">Success</option>
                            <option value="processing">Processing</option>
                            <option value="pending">Pending</option>
                            <option value="failed">Failed</option>
                        </select>
                    </div>

                    <div className="md:col-span-6">
                        <label className="text-xs text-gray-300">Reference (order/payment)</label>
                        <Input name="service" placeholder="Reference (order/payment)" defaultValue={typeof filters !== 'undefined' ? (filters.service ?? '') : ''} className="w-full rounded-full border border-neutral-800 bg-transparent px-4 py-3 text-sm text-white placeholder:text-gray-400" />
                    </div>

                    <div className="md:col-span-2">
                        <label className="text-xs text-gray-300">From</label>
                        <Input type="date" name="start_date" defaultValue={typeof filters !== 'undefined' ? (filters.start_date ?? '') : ''} className="w-full rounded-full border border-neutral-800 bg-transparent px-4 py-3 text-sm text-white placeholder:text-gray-400" />
                    </div>

                    <div className="md:col-span-2">
                        <label className="text-xs text-gray-300">To</label>
                        <Input type="date" name="end_date" defaultValue={typeof filters !== 'undefined' ? (filters.end_date ?? '') : ''} className="w-full rounded-full border border-neutral-800 bg-transparent px-4 py-3 text-sm text-white placeholder:text-gray-400" />
                    </div>

                    <div className="md:col-span-3">
                        <label className="text-xs text-gray-300">Min amount</label>
                        <Input type="number" step="0.01" name="min_cost" placeholder="Min amount" defaultValue={typeof filters !== 'undefined' ? (filters.min_cost ?? '') : ''} className="w-full rounded-full border border-neutral-800 bg-transparent px-4 py-3 text-sm text-white placeholder:text-gray-400" />
                    </div>

                    <div className="md:col-span-3">
                        <label className="text-xs text-gray-300">Max amount</label>
                        <Input type="number" step="0.01" name="max_cost" placeholder="Max amount" defaultValue={typeof filters !== 'undefined' ? (filters.max_cost ?? '') : ''} className="w-full rounded-full border border-neutral-800 bg-transparent px-4 py-3 text-sm text-white placeholder:text-gray-400" />
                    </div>

                    <div className="md:col-span-3 md:col-start-10 flex gap-2 items-center">
                        <Button type="submit" className="rounded-full px-6 py-3">Apply</Button>
                        <Button asChild variant="outline" className="rounded-full px-6 py-3">
                            <Link href={orders?.path || '/orders'}>Clear</Link>
                        </Button>
                    </div>
                                    </form>
                                </FilterBar>

                <Card>
                    <CardHeader>
                        <CardTitle>Orders</CardTitle>
                        <CardDescription>{isAdmin ? 'All orders from all users' : 'All your placed orders'}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Order #</TableHead>
                                    {isAdmin && <TableHead>User</TableHead>}
                                    <TableHead>Service</TableHead>
                                    <TableHead>Qty</TableHead>
                                    <TableHead>Cost</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>External ID</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.data.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell>{new Date(order.created_at).toLocaleString()}</TableCell>
                                        <TableCell>#{order.id}</TableCell>
                                        {isAdmin && (
                                            <TableCell>
                                                {order.user ? (
                                                    <div>
                                                        <div className="font-medium">{order.user.name}</div>
                                                        <div className="text-sm text-muted-foreground">{order.user.email}</div>
                                                    </div>
                                                ) : (
                                                    <span className="text-muted-foreground">-</span>
                                                )}
                                            </TableCell>
                                        )}
                                        <TableCell>{order.service_name ?? order.service}</TableCell>
                                        <TableCell>{order.quantity}</TableCell>
                                        <TableCell>₹{parseFloat(order.cost).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                                        <TableCell>
                                            {order.external_id ? (
                                                <code className="text-xs bg-muted px-1 py-0.5 rounded">{order.external_id}</code>
                                            ) : (
                                                <span className="text-muted-foreground">-</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {order.external_id && (order.status === 'pending' || order.status === 'processing') ? (
                                                <Button size="sm" onClick={async () => {
                                                    try {
                                                        const res = await fetch(`/orders/status?order=${encodeURIComponent(order.external_id)}&action=status`, { credentials: 'same-origin' });
                                                        const data = await res.json();
                                                        if (!res.ok) {
                                                            await Swal.fire({ title: 'Status check failed', text: (data.error || JSON.stringify(data)), icon: 'error' });
                                                            return;
                                                        }

                                                        const providerPayload = data.provider ?? data;

                                                        let parsed = providerPayload;
                                                        if (typeof providerPayload === 'string') {
                                                            try {
                                                                parsed = JSON.parse(providerPayload);
                                                            } catch (e) {
                                                                parsed = providerPayload;
                                                            }
                                                        }

                                                        // Build a friendly HTML view: key fields + pretty JSON/text
                                                        const extract = (obj) => {
                                                            if (!obj || typeof obj !== 'object') return null;
                                                            return {
                                                                status: obj.status ?? obj.stat ?? obj.result ?? null,
                                                                charge: obj.charge ?? obj.cost ?? null,
                                                                remains: obj.remains ?? obj.left ?? null,
                                                                start_count: obj.start_count ?? null,
                                                            };
                                                        };

                                                        const keys = extract(parsed);

                                                        let detailsHtml = '';
                                                        if (keys) {
                                                            detailsHtml += '<div style="text-align:left;margin-bottom:12px">';
                                                            if (keys.status) detailsHtml += `<div><strong>Status:</strong> ${keys.status}</div>`;
                                                            if (keys.charge) detailsHtml += `<div><strong>Charge:</strong> ${keys.charge}</div>`;
                                                            if (keys.start_count) detailsHtml += `<div><strong>Start count:</strong> ${keys.start_count}</div>`;
                                                            if (keys.remains) detailsHtml += `<div><strong>Remains:</strong> ${keys.remains}</div>`;
                                                            detailsHtml += '</div>';
                                                        }

                                                        let pretty = '';
                                                        if (typeof parsed === 'object') {
                                                            pretty = JSON.stringify(parsed, null, 2);
                                                        } else {
                                                            pretty = String(parsed);
                                                        }

                                                        await Swal.fire({
                                                            title: 'Provider response',
                                                            html: `${detailsHtml}<pre style="text-align:left;white-space:pre-wrap;word-break:break-word;margin:0;padding:8px;background:#0f1724;border-radius:6px;color:#d1d5db;">${pretty}</pre>`,
                                                            width: 760,
                                                            icon: 'info',
                                                        });
                                                    } catch (e) {
                                                        // eslint-disable-next-line no-console
                                                        console.error(e);
                                                        window.alert('Error while checking status');
                                                    }
                                                }}>Check</Button>
                                            ) : (
                                                <span className="text-muted-foreground">-</span>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {orders.data.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">No orders found.</div>
                        )}

                        <div className="flex items-center justify-between mt-4">
                            <div className="text-sm text-muted-foreground">Page {orders.current_page} of {orders.last_page} · Total {Number(orders.total).toLocaleString()}</div>
                            <div className="flex gap-2">
                                <Button disabled={!orders.prev_page_url} asChild>
                                    <Link href={orders.prev_page_url ?? '#'}>Previous</Link>
                                </Button>
                                <Button disabled={!orders.next_page_url} asChild>
                                    <Link href={orders.next_page_url ?? '#'}>Next</Link>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
