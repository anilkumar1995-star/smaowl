import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import payments from '@/routes/payments';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';
import { BarChart } from 'recharts/es6/chart/BarChart';
import { Bar } from 'recharts/es6/cartesian/Bar';
import { XAxis } from 'recharts/es6/cartesian/XAxis';
import { YAxis } from 'recharts/es6/cartesian/YAxis';
import { CartesianGrid } from 'recharts/es6/cartesian/CartesianGrid';
import { Tooltip } from 'recharts/es6/component/Tooltip';
import { ResponsiveContainer } from 'recharts/es6/component/ResponsiveContainer';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Payment History',
        href: payments.history().url,
    },
];

interface Payment {
    id: number;
    amount: number;
    currency: string;
    status: 'pending' | 'captured' | 'failed' | 'cancelled';
    razorpay_payment_id: string | null;
    created_at: string;
    paid_at: string | null;
    metadata?: any;
}

interface PaymentsHistoryProps {
    payments: {
        data: Payment[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        prev_page_url?: string | null;
        next_page_url?: string | null;
        path?: string;
    };
    totalInvested: number;
    availableBalance: number;
    graphData: { month: string; total: number }[];
    filters?: Record<string, any>;
}

export default function PaymentsHistory({ payments, totalInvested, availableBalance, graphData, filters }: PaymentsHistoryProps) {
    const { props } = usePage<any>();
    const isAdmin = props?.auth?.isAdmin || props?.isAdmin || props?.is_admin || false;

    const getStatusBadge = (status: string) => {
        const variants = {
            captured: 'default',
            pending: 'secondary',
            failed: 'destructive',
            cancelled: 'outline',
        } as const;

        return (
            <Badge variant={variants[status as keyof typeof variants] || 'outline'}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Payment History" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">₹{parseFloat(totalInvested).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">₹{parseFloat(availableBalance).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        </CardContent>
                    </Card>
                </div>                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Payment History</h1>
                        <p className="text-muted-foreground">
                            View all your payment transactions
                        </p>
                    </div>
                    <div className="flex gap-2">
                        {/* Hide financial actions for admin users */}
                        {(!props?.auth?.isAdmin) && (
                            <>
                                <Button asChild>
                                    <Link href='/payments/add-funds'>
                                        Add Funds
                                    </Link>
                                </Button>

                                <Button asChild variant="outline">
                                    <Link href="/payments/manual">Manual Load</Link>
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                {/* Filters */}
                <form method="get" className="flex gap-2 items-end my-2 flex-wrap">
                    <select name="status" defaultValue={typeof filters !== 'undefined' && filters.status ? String(filters.status) : ''} className="border-input rounded-md px-2 py-1 text-sm w-36">
                        <option value="">All</option>
                        <option value="pending">Pending</option>
                        <option value="captured">Captured</option>
                        <option value="failed">Failed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>

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
                        <Input type="number" step="0.01" name="min_amount" placeholder="Min amount" defaultValue={typeof filters !== 'undefined' ? (filters.min_amount ?? '') : ''} />
                        <Input type="number" step="0.01" name="max_amount" placeholder="Max amount" defaultValue={typeof filters !== 'undefined' ? (filters.max_amount ?? '') : ''} />
                    </div>

                    <div className="flex gap-2">
                        <Button type="submit">Apply</Button>
                        <Button asChild variant="outline">
                            <Link href={payments?.path || '/payments/history'}>Clear</Link>
                        </Button>
                    </div>
                </form>

                <Card>
                    <CardHeader>
                        <CardTitle>Payment Trends</CardTitle>
                        <CardDescription>
                            Monthly payment amounts over time
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={graphData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip formatter={(value) => [`₹${parseFloat(value).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'Amount']} />
                                <Bar dataKey="total" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Transactions</CardTitle>
                        <CardDescription>
                            A list of all your payment transactions
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Payment ID</TableHead>
                                    {isAdmin && <TableHead>Action</TableHead>}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {payments.data.map((payment) => (
                                    <TableRow key={payment.id}>
                                        <TableCell>
                                            {new Date(payment.created_at).toLocaleString()}
                                        </TableCell>
                                        <TableCell>
                                            {/* Type: Manual vs Online */}
                                            {payment.metadata && payment.metadata.manual_request ? 'Manual' : 'Online'}
                                        </TableCell>
                                        <TableCell>
                                            ₹{parseFloat(payment.amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </TableCell>
                                        <TableCell>
                                            {getStatusBadge(payment.status)}
                                        </TableCell>
                                        <TableCell>
                                            {payment.razorpay_payment_id ? (
                                                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                                                    {payment.razorpay_payment_id}
                                                </code>
                                            ) : (
                                                <span className="text-muted-foreground">-</span>
                                            )}
                                        </TableCell>

                                        {isAdmin && (
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Button variant="outline" size="sm" onClick={async () => {
                                                    try {
                                                        const tokenMeta = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null;
                                                        const token = tokenMeta ? tokenMeta.content : '';

                                                        const res = await fetch(`/admin/payments/${payment.id}/check`, {
                                                            method: 'POST',
                                                            headers: {
                                                                'Content-Type': 'application/json',
                                                                'X-CSRF-TOKEN': token,
                                                            },
                                                            credentials: 'same-origin',
                                                        });

                                                        const data = await res.json();

                                                        if (!res.ok) {
                                                            await Swal.fire({ title: 'Error', text: data?.error || 'Failed to fetch status', icon: 'error' });
                                                            return;
                                                        }

                                                        const remote = data.remote;

                                                        const escapeHtml = (s: string) =>
                                                            s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

                                                        const first = Array.isArray(remote) ? remote[0] : remote;

                                                        let details = '';
                                                        if (first && typeof first === 'object') {
                                                            const fields = [
                                                                ['ID', first.id || first.razorpay_payment_id || first.order_id || ''],
                                                                ['Status', first.status ?? first.state ?? 'unknown'],
                                                                ['Amount', first.amount ? `₹${(parseFloat(first.amount) / (first.currency === 'INR' ? 100 : 1)).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : ''],
                                                                ['Captured', first.captured === undefined ? '' : String(first.captured)],
                                                                ['Order', first.order_id || ''],
                                                                ['Method', first.method || ''],
                                                                ['Refunded', first.amount_refunded ? String(first.amount_refunded) : '0'],
                                                                ['Email', first.email || ''],
                                                                ['Contact', first.contact || ''],
                                                            ];

                                                            details = '<div style="text-align:left;margin-bottom:8px">' + fields.map(([k, v]) => `<div><strong>${escapeHtml(k + ':')}</strong> ${escapeHtml(String(v ?? ''))}</div>`).join('') + '</div>';
                                                        }

                                                        const pretty = escapeHtml(JSON.stringify(remote, null, 2));
                                                        const html = `${details}<pre style="text-align:left;white-space:pre-wrap;max-height:420px;overflow:auto;background:#f6f8fa;padding:12px;border-radius:6px">${pretty}</pre>`;

                                                        await Swal.fire({ title: 'Remote Payment Status', html, width: 760 });
                                                    } catch (err) {
                                                        await Swal.fire({ title: 'Error', text: String(err), icon: 'error' });
                                                    }
                                                    }}>
                                                        Check
                                                    </Button>

                                                    <Button variant="secondary" size="sm" disabled={payment.status === 'captured'} onClick={async () => {
                                                        const confirmed = await Swal.fire({
                                                            title: 'Capture Payment?',
                                                            text: `Capture payment #${payment.id} and credit user?`,
                                                            icon: 'question',
                                                            showCancelButton: true,
                                                            confirmButtonText: 'Capture',
                                                        });

                                                        if (!confirmed.isConfirmed) return;

                                                        try {
                                                            const tokenMeta = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null;
                                                            const token = tokenMeta ? tokenMeta.content : '';

                                                            const res = await fetch(`/admin/payments/${payment.id}/status`, {
                                                                method: 'POST',
                                                                headers: {
                                                                    'Content-Type': 'application/json',
                                                                    'X-CSRF-TOKEN': token,
                                                                },
                                                                credentials: 'same-origin',
                                                                body: JSON.stringify({ status: 'captured' }),
                                                            });

                                                            const data = await res.json();

                                                            if (!res.ok) {
                                                                await Swal.fire({ title: 'Error', text: data?.error || 'Failed to capture', icon: 'error' });
                                                                return;
                                                            }

                                                            await Swal.fire({ title: 'Captured', text: 'Payment captured and user credited', icon: 'success' });
                                                            location.reload();
                                                        } catch (err) {
                                                            await Swal.fire({ title: 'Error', text: String(err), icon: 'error' });
                                                        }
                                                    }}>
                                                        Capture
                                                    </Button>

                                                    <Button variant="destructive" size="sm" disabled={payment.status === 'failed'} onClick={async () => {
                                                        const { value: reason } = await Swal.fire({
                                                            title: 'Reject Payment',
                                                            input: 'textarea',
                                                            inputLabel: 'Reason (optional)',
                                                            inputPlaceholder: 'Enter reason for rejection',
                                                            showCancelButton: true,
                                                        });

                                                        if (reason === undefined) return; // cancelled

                                                        const confirmed = await Swal.fire({
                                                            title: 'Confirm Reject',
                                                            text: 'Mark payment as failed and do not credit user?',
                                                            icon: 'warning',
                                                            showCancelButton: true,
                                                            confirmButtonText: 'Reject',
                                                        });

                                                        if (!confirmed.isConfirmed) return;

                                                        try {
                                                            const tokenMeta = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null;
                                                            const token = tokenMeta ? tokenMeta.content : '';

                                                            const res = await fetch(`/admin/payments/${payment.id}/status`, {
                                                                method: 'POST',
                                                                headers: {
                                                                    'Content-Type': 'application/json',
                                                                    'X-CSRF-TOKEN': token,
                                                                },
                                                                credentials: 'same-origin',
                                                                body: JSON.stringify({ status: 'failed', reason }),
                                                            });

                                                            const data = await res.json();

                                                            if (!res.ok) {
                                                                await Swal.fire({ title: 'Error', text: data?.error || 'Failed to reject', icon: 'error' });
                                                                return;
                                                            }

                                                            await Swal.fire({ title: 'Rejected', text: 'Payment marked as failed', icon: 'success' });
                                                            location.reload();
                                                        } catch (err) {
                                                            await Swal.fire({ title: 'Error', text: String(err), icon: 'error' });
                                                        }
                                                    }}>
                                                        Reject
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {payments.data.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">
                                No payment transactions found.
                            </div>
                        )}
                        {/* Pagination */}
                        <div className="flex items-center justify-between mt-4">
                            <div className="text-sm text-muted-foreground">
                                Showing {payments.data.length > 0 ? ((payments.current_page - 1) * payments.per_page + 1) : 0} - {Math.min(payments.current_page * payments.per_page, payments.total)} of {payments.total}
                            </div>

                            <div className="flex items-center gap-2">
                                <Button asChild disabled={!payments.prev_page_url} variant="outline">
                                    <Link href={payments.prev_page_url || '#'}>Previous</Link>
                                </Button>

                                <div className="flex items-center gap-1">
                                    {Array.from({ length: Math.min(payments.last_page || 0, 10) }, (_, i) => i + 1).map((page) => (
                                        <Button key={page} asChild variant={page === payments.current_page ? undefined : 'outline'}>
                                            <Link href={`${payments.path || '/payments/history'}?page=${page}`}>{page}</Link>
                                        </Button>
                                    ))}
                                </div>

                                <Button asChild disabled={!payments.next_page_url} variant="outline">
                                    <Link href={payments.next_page_url || '#'}>Next</Link>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}