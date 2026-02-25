import PublicLayout from '@/layouts/public-layout';
import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Home', href: '/' },
    { title: 'Services', href: '/services' },
];

interface SubService {
    service: string;
    name: string;
    rate: string;
    min?: number;
    max?: number;
    refill?: boolean;
    cancel?: boolean;
}

interface ServiceGroup {
    id: string | number;
    name: string;
    services: SubService[];
}

interface Props {
    serviceGroups?: ServiceGroup[];
}

export default function Services({ serviceGroups = [] }: Props) {
    return (
        <PublicLayout>
            <Head title="Services" />

            <div className="max-w-6xl mx-auto py-12 px-6">
                <h1 className="text-3xl font-bold">Our Services</h1>
                <p className="text-muted-foreground mt-2">Browse available services and their pricing.</p>

                <div className="mt-8 grid gap-8">
                    {serviceGroups.length === 0 && (
                        <div className="text-muted-foreground">No services available.</div>
                    )}

                    {serviceGroups.map((group) => (
                        <section key={group.id}>
                            <h2 className="text-xl font-semibold">{group.name}</h2>
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                                {group.services.map((s) => (
                                    <div key={s.service} className="p-4 border rounded">
                                        <div className="font-medium">{s.name}</div>
                                        <div className="text-sm text-muted-foreground">Rate: ₹{parseFloat(s.rate).toFixed(2)}/1000</div>
                                        <div className="text-sm text-muted-foreground">Min: {s.min} • Max: {s.max}</div>
                                        <div className="mt-3">
                                            <Link href={`/orders/create?service=${encodeURIComponent(s.service)}`} className="inline-block text-sm text-blue-600">Order</Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </PublicLayout>
    );
}
