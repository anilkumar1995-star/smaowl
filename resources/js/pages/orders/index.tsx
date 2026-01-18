import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import orders from '@/routes/orders';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

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

export default function OrdersIndex({ orders }: OrdersProps) {
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

                {/* Filters */}
                <form method="get" className="flex gap-2 items-end my-2 flex-wrap">
                    <select name="status" defaultValue={typeof filters !== 'undefined' && filters.status ? String(filters.status) : ''} className="border-input rounded-md px-2 py-1 text-sm w-40">
                        <option value="">All</option>
                        <option value="success">Success</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                    </select>

                    <Input name="service" placeholder="Service" defaultValue={typeof filters !== 'undefined' ? (filters.service ?? '') : ''} />

                    <div className="flex gap-2">
                        <div>
                            <label className="text-xs text-muted-foreground">From</label>
                            <Input type="date" name="start_date" defaultValue={typeof filters !== 'undefined' ? (filters.start_date ?? '') : ''} />
                        </div>
                        <div>
                            <label className="text-xs text-muted-foreground">To</label>
                            <Input type="date" name="end_date" defaultValue={typeof filters !== 'undefined' ? (filters.end_date ?? '') : ''} />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Input type="number" step="0.01" name="min_cost" placeholder="Min cost" defaultValue={typeof filters !== 'undefined' ? (filters.min_cost ?? '') : ''} />
                        <Input type="number" step="0.01" name="max_cost" placeholder="Max cost" defaultValue={typeof filters !== 'undefined' ? (filters.max_cost ?? '') : ''} />
                    </div>

                    <div className="flex gap-2">
                        <Button type="submit">Apply</Button>
                        <Button asChild variant="outline">
                            <Link href={orders?.path || '/orders'}>Clear</Link>
                        </Button>
                    </div>
                </form>

                <Card>
                    <CardHeader>
                        <CardTitle>Orders</CardTitle>
                        <CardDescription>All your placed orders</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Order #</TableHead>
                                    <TableHead>Service</TableHead>
                                    <TableHead>Qty</TableHead>
                                    <TableHead>Cost</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>External ID</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.data.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell>{new Date(order.created_at).toLocaleString()}</TableCell>
                                        <TableCell>#{order.id}</TableCell>
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
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {orders.data.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">No orders found.</div>
                        )}

                        <div className="flex items-center justify-between mt-4">
                            <div className="text-sm text-muted-foreground">Page {orders.current_page} of {orders.last_page}</div>
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
