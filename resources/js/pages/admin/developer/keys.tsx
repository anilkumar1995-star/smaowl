import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Swal from 'sweetalert2';

export default function DevKeys() {
    const { props } = usePage<any>();
    const keys = props.keys || [];
    const users = props.users || [];

    const handleGenerate = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Generate API Key',
            html:
                `<div style="text-align:left"><label class="swal2-label">User (optional)</label><select id="sw_user" class="swal2-input"><option value="">-- none --</option>${users
                    .map((u: any) => `<option value="${u.id}">${u.email}</option>`)
                    .join('')}</select><label class="swal2-label">Name (optional)</label><input id="sw_name" class="swal2-input" placeholder="Key name" /></div>`,
            focusConfirm: false,
            preConfirm: () => {
                const user_id = (document.getElementById('sw_user') as HTMLSelectElement).value;
                const name = (document.getElementById('sw_name') as HTMLInputElement).value;
                return { user_id, name };
            },
            showCancelButton: true,
        });

        if (!formValues) return;

        try {
            const tokenMeta = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null;
            const token = tokenMeta ? tokenMeta.content : '';

            const res = await fetch('/admin/developer/keys', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token,
                },
                credentials: 'same-origin',
                body: JSON.stringify(formValues),
            });

            const data = await res.json();
            if (!res.ok) {
                await Swal.fire('Error', data?.error || 'Failed to create key', 'error');
                return;
            }

            // Try to copy token automatically to clipboard
            try {
                await navigator.clipboard.writeText(data.token);
            } catch (err) {
                // ignore clipboard failures
            }

            await Swal.fire({
                title: 'API Key Created',
                html: `
                    <div style="text-align:left">
                        <p style="margin-bottom:8px">Copy this token now — it will not be shown again.</p>
                        <div style="display:flex;gap:8px;align-items:center">
                            <input id="apiToken" readonly value="${data.token}" style="flex:1;padding:10px;border-radius:6px;border:1px solid #e5e7eb;font-family:monospace;white-space:normal;overflow-wrap:anywhere" />
                            <button id="copyTokenBtn" type="button" class="swal2-confirm swal2-styled" style="background:#6b46c1;border:none;padding:8px 12px">Copy</button>
                        </div>
                        <p id="copyStatus" style="margin-top:8px;font-size:0.9em;color:#6b7280"></p>
                    </div>
                `,
                width: 700,
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonText: 'Done',
                didOpen: () => {
                    const copyBtn = document.getElementById('copyTokenBtn');
                    const tokenInput = document.getElementById('apiToken') as HTMLInputElement | null;
                    const status = document.getElementById('copyStatus');
                    if (copyBtn && tokenInput) {
                        copyBtn.addEventListener('click', async () => {
                            try {
                                await navigator.clipboard.writeText(tokenInput.value);
                                if (status) status.textContent = 'Copied to clipboard';
                                (copyBtn as HTMLButtonElement).textContent = 'Copied';
                                (copyBtn as HTMLButtonElement).setAttribute('disabled', 'true');
                            } catch (err) {
                                if (status) status.textContent = 'Unable to copy automatically — press Ctrl+C to copy';
                                tokenInput.select();
                            }
                        });
                    }
                },
            });

            // Reload to show new key in list
            location.reload();
        } catch (err) {
            await Swal.fire('Error', String(err), 'error');
        }
    };

    const handleRevoke = async (id: number) => {
        const confirmed = await Swal.fire({
            title: 'Revoke key?',
            text: 'This will invalidate the key immediately.',
            icon: 'warning',
            showCancelButton: true,
        });

        if (!confirmed.isConfirmed) return;

        try {
            const tokenMeta = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null;
            const token = tokenMeta ? tokenMeta.content : '';

            const res = await fetch(`/admin/developer/keys/${id}/revoke`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token,
                },
                credentials: 'same-origin',
            });

            const data = await res.json();
            if (!res.ok) {
                await Swal.fire('Error', data?.error || 'Failed to revoke', 'error');
                return;
            }

            await Swal.fire('Revoked', 'Key marked revoked', 'success');
            location.reload();
        } catch (err) {
            await Swal.fire('Error', String(err), 'error');
        }
    };

    return (
        <AppLayout>
            <Head title="Developer API Keys" />

            <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-2xl font-bold">Developer API Keys</h1>
                        <p className="text-muted-foreground">Generate and revoke personal API keys for users.</p>
                    </div>
                    <div>
                        <Button onClick={handleGenerate}>Generate Key</Button>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Keys</CardTitle>
                        <CardDescription>Active and revoked API keys</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>User</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Last Four</TableHead>
                                    <TableHead>Revoked</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {keys.map((k: any) => (
                                    <TableRow key={k.id}>
                                        <TableCell>{new Date(k.created_at).toLocaleString()}</TableCell>
                                        <TableCell>{k.user ? k.user.email : '-'}</TableCell>
                                        <TableCell>{k.name || '-'}</TableCell>
                                        <TableCell>{k.last_four || '-'}</TableCell>
                                        <TableCell>{k.revoked ? 'Yes' : 'No'}</TableCell>
                                        <TableCell>
                                            {!k.revoked && (
                                                <Button variant="destructive" size="sm" onClick={() => handleRevoke(k.id)}>Revoke</Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
