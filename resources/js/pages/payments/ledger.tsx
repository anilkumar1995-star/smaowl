import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import payments from '@/routes/payments';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Ledger',
        href: payments.ledger().url,
    },
];

interface LedgerEntry {
    id: number;
    type: 'credit' | 'debit';
    amount: string;
    balance: string;
    description?: string | null;
    reference_type?: string | null;
    reference_id?: number | null;
    meta?: any;
    created_at: string;
}

interface PaymentsLedgerProps {
    ledgers: {
        data: LedgerEntry[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        prev_page_url?: string | null;
        next_page_url?: string | null;
        path?: string;
    };
    closingBalance: number;
    filters?: Record<string, any>;
}

export default function PaymentsLedger({ ledgers, closingBalance }: PaymentsLedgerProps) {
    const getTypeBadge = (type: string) => {
        const variants = {
            credit: 'default',
            debit: 'destructive',
        } as const;

        return (
            <Badge variant={variants[type as keyof typeof variants] || 'outline'}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
            </Badge>
        );
    };

    const prevPage = ledgers.current_page > 1 ? ledgers.current_page - 1 : null;
    const nextPage = ledgers.current_page < ledgers.last_page ? ledgers.current_page + 1 : null;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ledger" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Closing Balance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">₹{parseFloat(String(closingBalance)).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Ledger</h1>
                        <p className="text-muted-foreground">View all your credit and debit entries</p>
                    </div>
                    <Button asChild>
                        <Link href={payments.history().url}>Payment History</Link>
                    </Button>
                </div>

                {/* Filters */}
                <form method="get" className="flex gap-2 items-end my-2 flex-wrap">
                    <select name="type" defaultValue={typeof filters !== 'undefined' && filters.type ? String(filters.type) : ''} className="border-input rounded-md px-2 py-1 text-sm w-40">
                        <option value="">All</option>
                        <option value="credit">Credit</option>
                        <option value="debit">Debit</option>
                    </select>

                    <Input name="reference_type" placeholder="Reference (order/payment)" defaultValue={typeof filters !== 'undefined' ? (filters.reference_type ?? '') : ''} />

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
                            <Link href={ledgers?.path || '/payments/ledger'}>Clear</Link>
                        </Button>
                    </div>
                </form>

                <Card>
                    <CardHeader>
                        <CardTitle>Entries</CardTitle>
                        <CardDescription>All ledger entries with closing balances</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Balance</TableHead>
                                    <TableHead>Reference</TableHead>
                                    <TableHead>Description</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {ledgers.data.map((entry) => (
                                    <TableRow key={entry.id}>
                                        <TableCell>{new Date(entry.created_at).toLocaleString()}</TableCell>
                                        <TableCell>{getTypeBadge(entry.type)}</TableCell>
                                        <TableCell>₹{parseFloat(String(entry.amount)).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                        <TableCell>₹{parseFloat(String(entry.balance)).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                        <TableCell>
                                            {entry.reference_type ? (
                                                <code className="text-xs bg-muted px-1 py-0.5 rounded">{entry.reference_type}#{entry.reference_id}</code>
                                            ) : (
                                                <span className="text-muted-foreground">-</span>
                                            )}
                                        </TableCell>
                                        <TableCell>{entry.description ?? <span className="text-muted-foreground">-</span>}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {ledgers.data.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">No ledger entries found.</div>
                        )}

                        <div className="flex items-center justify-between mt-4">
                            <div className="text-sm text-muted-foreground">Page {ledgers.current_page} of {ledgers.last_page}</div>
                            <div className="flex gap-2">
                                <Button disabled={!ledgers.prev_page_url} asChild>
                                    <Link href={ledgers.prev_page_url ?? '#'}>Previous</Link>
                                </Button>
                                <Button disabled={!ledgers.next_page_url} asChild>
                                    <Link href={ledgers.next_page_url ?? '#'}>Next</Link>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
