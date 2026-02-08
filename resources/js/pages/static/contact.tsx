import PublicLayout from '@/layouts/public-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import Swal from 'sweetalert2';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Home', href: '/' },
    { title: 'Contact', href: '/contact' },
];

export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const submit = async (e: any) => {
        e.preventDefault();
        await Swal.fire({ title: 'Message sent', text: 'Thank you — we will get back to you.', icon: 'success' });
        setName(''); setEmail(''); setMessage('');
    };

    return (
        <PublicLayout>
            <Head title="Contact Us" />
            <div className="max-w-xl mx-auto">
                <h1 className="text-2xl font-bold mb-3">Contact Us</h1>
                <form onSubmit={submit} className="space-y-3">
                    <div>
                        <Label>Name</Label>
                        <Input value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <Label>Email</Label>
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                    </div>
                    <div>
                        <Label>Message</Label>
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full rounded-md border-input p-2" rows={6}></textarea>
                    </div>
                    <Button type="submit">Send</Button>
                </form>
            </div>
        </PublicLayout>
    );
}
