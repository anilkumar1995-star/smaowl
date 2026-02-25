import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatCurrency } from '@/lib/currency';
import Swal from 'sweetalert2';

export default function AdminManualRequests() {
    const { props } = usePage<any>();
    const requests = props.requests ?? { data: [], prev_page_url: null, next_page_url: null };
    const approved = props.approved ?? { data: [], prev_page_url: null, next_page_url: null };

    const approve = async (id: number) => {
        const result = await Swal.fire({
            title: 'Approve manual load',
            text: 'Are you sure you want to approve this manual wallet load request?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Approve',
        });

        if (!result.isConfirmed) return;

        try {
            await router.post(`/admin/payments/${id}/approve`, {}, { preserveState: true });
            await Swal.fire({ title: 'Approved', icon: 'success', timer: 1200, showConfirmButton: false });
            router.reload();
        } catch (e) {
            await Swal.fire({ title: 'Error', text: 'Failed to approve request', icon: 'error' });
        }
    };

    const reject = async (id: number) => {
        const { value: reason, isConfirmed } = await Swal.fire<string>({
            title: 'Reject manual load',
            input: 'textarea',
            inputPlaceholder: 'Reason for rejection (optional)',
            showCancelButton: true,
            confirmButtonText: 'Reject',
            icon: 'warning',
        });

        if (!isConfirmed) return;

        try {
            await router.post(`/admin/payments/${id}/reject`, { reason }, { preserveState: true });
            await Swal.fire({ title: 'Rejected', icon: 'success', timer: 1200, showConfirmButton: false });
            router.reload();
        } catch (e) {
            await Swal.fire({ title: 'Error', text: 'Failed to reject request', icon: 'error' });
        }
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/' }, { title: 'Admin', href: '/admin' }, { title: 'Manual Wallet Requests' }]}> 
            <Head title="Manual Wallet Load Requests" />

            <div className="p-4">
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
                        <form method="get" className="my-2">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                                <div>
                                    <Label>User email</Label>
                                    <Input name="user_email" placeholder="User email" defaultValue={props.filters?.user_email ?? ''} />
                                </div>

                                <div>
                                    <Label>From</Label>
                                    <Input type="date" name="start_date" defaultValue={props.filters?.start_date ?? ''} />
                                </div>

                                <div>
                                    <Label>To</Label>
                                    <Input type="date" name="end_date" defaultValue={props.filters?.end_date ?? ''} />
                                </div>

                                <div>
                                    <Label>Min amount</Label>
                                    <Input type="number" step="0.01" name="min_amount" placeholder="Min amount" defaultValue={props.filters?.min_amount ?? ''} />
                                </div>

                                <div>
                                    <Label>Max amount</Label>
                                    <Input type="number" step="0.01" name="max_amount" placeholder="Max amount" defaultValue={props.filters?.max_amount ?? ''} />
                                </div>

                                <div>
                                    <Label>Status</Label>
                                    <select name="status" defaultValue={props.filters?.status ?? ''} className="border-input rounded-md px-2 py-1 text-sm w-full">
                                        <option value="">All</option>
                                        <option value="pending">Pending</option>
                                        <option value="captured">Approved</option>
                                    </select>
                                </div>

                                <div className="sm:col-span-2 md:col-span-4 flex justify-end items-end gap-2">
                                    <Button type="submit">Apply</Button>
                                    <a href={`/admin/payments/manual-requests/export${typeof window !== 'undefined' ? window.location.search : ''}`} className="inline-flex items-center justify-center px-3 py-2 rounded-md border border-gray-300 text-sm hover:bg-gray-50" target="_blank" rel="noopener noreferrer">Export CSV</a>
                                </div>
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
                                            <th className="text-left p-2">UTR</th>
                                            <th className="text-left p-2">Screenshot</th>
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
                                                <td className="p-2">{r.metadata?.utr ?? '—'}</td>
                                                <td className="p-2">
                                                    {r.metadata?.screenshot_url ? (
                                                        <a href={r.metadata.screenshot_url} target="_blank" rel="noopener noreferrer" className="inline-block">
                                                            <img src={r.metadata.screenshot_url} alt="screenshot" className="w-16 h-10 object-cover rounded" />
                                                        </a>
                                                    ) : r.metadata?.screenshot ? (
                                                        <a href={`/storage/${r.metadata.screenshot}`} target="_blank" rel="noopener noreferrer" className="inline-block">
                                                            <img src={`/storage/${r.metadata.screenshot}`} alt="screenshot" className="w-16 h-10 object-cover rounded" />
                                                        </a>
                                                    ) : (
                                                        '—'
                                                    )}
                                                </td>
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
                                            <th className="text-left p-2">UTR</th>
                                            <th className="text-left p-2">Screenshot</th>
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
                                                <td className="p-2">{a.metadata?.utr ?? '—'}</td>
                                                <td className="p-2">
                                                    {a.metadata?.screenshot ? (
                                                        <a href={`/storage/${a.metadata.screenshot}`} target="_blank" rel="noopener noreferrer">
                                                            <img src={`/storage/${a.metadata.screenshot}`} alt="screenshot" className="w-16 h-10 object-cover rounded" />
                                                        </a>
                                                    ) : '—'}
                                                </td>
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
