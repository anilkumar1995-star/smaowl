import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import payments from '@/routes/payments';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
}

interface PaymentsHistoryProps {
    payments: {
        data: Payment[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    totalInvested: number;
    availableBalance: number;
    graphData: { month: string; total: number }[];
}

export default function PaymentsHistory({ payments, totalInvested, availableBalance, graphData }: PaymentsHistoryProps) {
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
                    <Button asChild>
                        <Link href='/payments/add-funds'>
                            Add Funds
                        </Link>
                    </Button>
                </div>

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
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Payment ID</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {payments.data.map((payment) => (
                                    <TableRow key={payment.id}>
                                        <TableCell>
                                            {new Date(payment.created_at).toLocaleString()}
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
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {payments.data.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">
                                No payment transactions found.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}