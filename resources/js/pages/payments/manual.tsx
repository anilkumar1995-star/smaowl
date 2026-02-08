import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ManualLoad() {
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const csrf = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content;

        try {
            const res = await fetch('/payments/manual', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf || '',
                },
                credentials: 'same-origin',
                body: JSON.stringify({ amount, note }),
            });

            let messageText = 'Failed to submit request';
            const contentType = res.headers.get('content-type') || '';
            if (contentType.includes('application/json')) {
                const data = await res.json();
                if (res.ok) {
                    messageText = 'Request submitted — an admin will review and approve it.';
                    setAmount('');
                    setNote('');
                } else {
                    messageText = data.error || `${res.status} ${res.statusText}`;
                }
            } else {
                const text = await res.text();
                messageText = text || `${res.status} ${res.statusText}`;
            }

            setMessage(messageText);
        } catch (e) {
            setMessage('Failed to submit request');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Dashboard', href: dashboard().url }, { title: 'Manual Load' }]}> 
            <Head title="Manual Wallet Load" />
            <div className="p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Manual Wallet Load</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="flex flex-col gap-2 max-w-md">
                            <label className="text-sm">Amount (INR)</label>
                            <Input type="number" step="0.01" min={1} value={amount} onChange={(e) => setAmount(e.target.value)} />

                            <label className="text-sm">Note (optional)</label>
                            <Input type="text" value={note} onChange={(e) => setNote(e.target.value)} />

                            <div className="flex gap-2">
                                <Button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit Request'}</Button>
                                <Button variant="outline" onClick={() => { setAmount(''); setNote(''); }}>Reset</Button>
                            </div>

                            {message && <div className="text-sm text-muted-foreground mt-2">{message}</div>}
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}