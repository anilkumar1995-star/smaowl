import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/currency';
import { Inertia } from '@inertiajs/inertia';

export default function AdminManualRequests() {
    const { props } = usePage<any>();
    const requests = props.requests;

    const approve = (id: number) => {
        if (!confirm('Approve this manual wallet load request?')) return;
        Inertia.post(`/admin/payments/${id}/approve`, {}, { preserveState: true }).then(() => Inertia.reload());
    };

    const reject = (id: number) => {
        const reason = prompt('Reason for rejection (optional)');
        if (reason === null) return;
        Inertia.post(`/admin/payments/${id}/reject`, { reason }, { preserveState: true }).then(() => Inertia.reload());
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/' }, { title: 'Admin', href: '/admin' }, { title: 'Manual Wallet Requests' }]}> 
            <Head title="Manual Wallet Load Requests" />

            <div className="p-4">
                <Card>
                    <Card>
                    <CardHeader>
                        <CardTitle>Manual Wallet Load Requests</CardTitle>
                        <CardDescription>Pending and approved manual requests</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="p-4 border rounded">
                                <div className="text-sm text-muted-foreground">Pending Requests</div>
                                <div className="text-2xl font-bold">{props.reports?.pending_count ?? 0}</div>
                                <div className="text-sm">Total: {formatCurrency(props.reports?.pending_sum ?? 0)}</div>
                            </div>

                            <div className="p-4 border rounded">
                                <div className="text-sm text-muted-foreground">Approved</div>
                                <div className="text-2xl font-bold">{props.reports?.approved_count ?? 0}</div>
                                <div className="text-sm">Total: {formatCurrency(props.reports?.approved_sum ?? 0)}</div>
                            </div>
                        </div>

                        {/* Filters & actions */}
                        <form method="get" className="flex gap-2 items-end my-2 flex-wrap">
                            <input name="user_email" placeholder="User email" defaultValue={props.filters?.user_email ?? ''} className="border-input rounded-md px-2 py-1 text-sm" />
                            <div>
                                <label className="text-xs text-muted-foreground">From</label>
                                <input type="date" name="start_date" defaultValue={props.filters?.start_date ?? ''} className="border-input rounded-md px-2 py-1 text-sm" />
                            </div>
                            <div>
                                <label className="text-xs text-muted-foreground">To</label>
                                <input type="date" name="end_date" defaultValue={props.filters?.end_date ?? ''} className="border-input rounded-md px-2 py-1 text-sm" />
                            </div>
                            <input type="number" step="0.01" name="min_amount" placeholder="Min amount" defaultValue={props.filters?.min_amount ?? ''} className="border-input rounded-md px-2 py-1 text-sm" />
                            <input type="number" step="0.01" name="max_amount" placeholder="Max amount" defaultValue={props.filters?.max_amount ?? ''} className="border-input rounded-md px-2 py-1 text-sm" />
                            <select name="status" defaultValue={props.filters?.status ?? ''} className="border-input rounded-md px-2 py-1 text-sm">
                                <option value="">All</option>
                                <option value="pending">Pending</option>
                                <option value="captured">Approved</option>
                            </select>

                            <div className="flex gap-2">
                                <button type="submit" className="btn">Apply</button>
                                <a href={`/admin/payments/manual-requests/export${typeof window !== 'undefined' ? window.location.search : ''}`} className="btn btn-outline" target="_blank" rel="noopener noreferrer">Export CSV</a>
                            </div>
                        </form>

                        <h3 className="text-lg font-semibold mb-2">Pending Requests</h3>

                        {requests.data && requests.data.length ? (
                            <div className="overflow-auto">
                                <table className="w-full table-auto">
                                    <thead>
                                        <tr>
                                            <th className="text-left p-2">ID</th>
                                            <th className="text-left p-2">User</th>
                                            <th className="text-left p-2">Amount</th>
                                            <th className="text-left p-2">Note</th>
                                            <th className="text-left p-2">Status</th>
                                            <th className="text-left p-2">Requested At</th>
                                            <th className="text-left p-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {requests.data.map((r: any) => (
                                            <tr key={r.id} className="border-t">
                                                <td className="p-2">{r.id}</td>
                                                <td className="p-2">{r.user?.email || r.user?.name || '—'}</td>
                                                <td className="p-2">{formatCurrency(r.amount)}</td>
                                                <td className="p-2">{r.description}</td>
                                                <td className="p-2">{r.status}</td>
                                                <td className="p-2">{new Date(r.created_at).toLocaleString()}</td>
                                                <td className="p-2">
                                                    <div className="flex gap-2">
                                                        <Button size="sm" onClick={() => approve(r.id)}>Approve</Button>
                                                        <Button variant="destructive" size="sm" onClick={() => reject(r.id)}>Reject</Button>
                                                    </div>
                                                    {r.status === 'failed' && r.metadata?.rejected_reason && (
                                                        <div className="text-xs text-muted-foreground mt-1">Rejected: {r.metadata.rejected_reason}</div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="mt-4">
                                    <div className="flex gap-2">
                                        {requests.prev_page_url && (<a href={requests.prev_page_url} className="underline">Previous</a>)}
                                        {requests.next_page_url && (<a href={requests.next_page_url} className="underline">Next</a>)}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>No pending manual requests.</div>
                        )}
                    </CardContent>
                </Card>

                <Card className="mt-4">
                    <CardHeader>
                        <CardTitle>Approved Manual Payments</CardTitle>
                        <CardDescription>Previously approved manual loads</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {approved.data && approved.data.length ? (
                            <div className="overflow-auto">
                                <table className="w-full table-auto">
                                    <thead>
                                        <tr>
                                            <th className="text-left p-2">ID</th>
                                            <th className="text-left p-2">User</th>
                                            <th className="text-left p-2">Amount</th>
                                            <th className="text-left p-2">Description</th>
                                            <th className="text-left p-2">Paid At</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {approved.data.map((a: any) => (
                                            <tr key={a.id} className="border-t">
                                                <td className="p-2">{a.id}</td>
                                                <td className="p-2">{a.user?.email || a.user?.name || '—'}</td>
                                                <td className="p-2">{formatCurrency(a.amount)}</td>
                                                <td className="p-2">{a.description}</td>
                                                <td className="p-2">{new Date(a.paid_at).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="mt-4">
                                    <div className="flex gap-2">
                                        {approved.prev_page_url && (<a href={approved.prev_page_url} className="underline">Previous</a>)}
                                        {approved.next_page_url && (<a href={approved.next_page_url} className="underline">Next</a>)}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>No approved manual payments.</div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
