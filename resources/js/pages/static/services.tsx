import PublicLayout from '@/layouts/public-layout';
import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { useMemo, useState } from 'react';

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
    const [query, setQuery] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('all');
    const [minRate, setMinRate] = useState<string>('');
    const [maxRate, setMaxRate] = useState<string>('');
    const [refillOnly, setRefillOnly] = useState(false);
    const [sortBy, setSortBy] = useState<'rate_asc' | 'rate_desc' | 'name'>('rate_asc');

    const groupOptions = useMemo(() => {
        return [{ id: 'all', name: 'All' }, ...serviceGroups.map(g => ({ id: String(g.id), name: g.name }))];
    }, [serviceGroups]);

    const filteredGroups = useMemo(() => {
        const min = parseFloat(minRate as string) || 0;
        const max = parseFloat(maxRate as string) || Infinity;

        return serviceGroups
            .map((group) => {
                const services = group.services
                    .filter((s) => {
                        const rate = Number(parseFloat(String(s.rate)));
                        if (Number.isNaN(rate)) return false;

                        if (selectedGroup !== 'all' && String(group.id) !== selectedGroup) return false;
                        if (refillOnly && !s.refill) return false;
                        if (query && !s.name.toLowerCase().includes(query.toLowerCase()) && !s.service.toLowerCase().includes(query.toLowerCase())) return false;
                        if (rate < min) return false;
                        if (rate > max) return false;
                        return true;
                    })
                    .sort((a, b) => {
                        const ra = parseFloat(String(a.rate));
                        const rb = parseFloat(String(b.rate));
                        if (sortBy === 'rate_asc') return ra - rb;
                        if (sortBy === 'rate_desc') return rb - ra;
                        return a.name.localeCompare(b.name);
                    });

                return { ...group, services };
            })
            .filter(g => g.services && g.services.length > 0);
    }, [serviceGroups, query, selectedGroup, minRate, maxRate, refillOnly, sortBy]);
    return (
        <PublicLayout>
            <Head title="Services" />

            <div className="max-w-6xl mx-auto py-12 px-6">
                <h1 className="text-3xl font-bold">Our Services</h1>
                <p className="text-muted-foreground mt-2">Browse available services and their pricing.</p>

                <div className="mt-6">
                    <div className="bg-card text-card-foreground rounded-lg shadow-sm p-6 border">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search services or keywords..."
                                className="col-span-1 md:col-span-5 bg-input text-foreground border border-border/20 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                            />

                            <select
                                value={selectedGroup}
                                onChange={(e) => setSelectedGroup(e.target.value)}
                                className="col-span-1 md:col-span-3 bg-input text-foreground border border-border/20 rounded-lg px-4 py-3 w-full"
                            >
                                {groupOptions.map(opt => (
                                    <option key={opt.id} value={opt.id}>{opt.name}</option>
                                ))}
                            </select>

                            <input
                                type="number"
                                value={minRate}
                                onChange={(e) => setMinRate(e.target.value)}
                                placeholder="Min rate"
                                className="col-span-1 md:col-span-1 bg-input text-foreground border border-border/20 rounded-lg px-4 py-3 w-full"
                            />

                            <input
                                type="number"
                                value={maxRate}
                                onChange={(e) => setMaxRate(e.target.value)}
                                placeholder="Max rate"
                                className="col-span-1 md:col-span-1 bg-input text-foreground border border-border/20 rounded-lg px-4 py-3 w-full"
                            />

                            <label className="col-span-1 md:col-span-1 flex items-center space-x-2 text-sm">
                                <input type="checkbox" checked={refillOnly} onChange={(e) => setRefillOnly(e.target.checked)} className="form-checkbox h-4 w-4" />
                                <span className="text-card-foreground">Refill only</span>
                            </label>

                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="col-span-1 md:col-span-1 bg-input text-foreground border border-border/20 rounded-lg px-4 py-3 w-full">
                                <option value="rate_asc">Rate ↑</option>
                                <option value="rate_desc">Rate ↓</option>
                                <option value="name">Name</option>
                            </select>

                            <div className="col-span-1 md:col-span-1 md:col-start-12 text-right">
                                <button
                                    type="button"
                                    onClick={() => { setQuery(''); setSelectedGroup('all'); setMinRate(''); setMaxRate(''); setRefillOnly(false); setSortBy('rate_asc'); }}
                                    className="text-sm text-muted-foreground hover:text-foreground"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 grid gap-8">
                        {serviceGroups.length === 0 && (
                            <div className="text-muted-foreground">No services available.</div>
                        )}

                        {filteredGroups.length === 0 && serviceGroups.length > 0 && (
                            <div className="text-muted-foreground">No services match your filters.</div>
                        )}

                        {filteredGroups.map((group) => (
                            <section key={group.id}>
                                <h2 className="text-xl font-semibold">{group.name}</h2>
                                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {group.services.map((s) => (
                                        <div key={s.service} className="p-4 border rounded hover:shadow transition">
                                            <div className="font-medium">{s.name}</div>
                                            <div className="text-sm text-muted-foreground">Rate: ₹{Number(parseFloat(String(s.rate))).toFixed(2)}/1000</div>
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
            </div>
        </PublicLayout>
    );
}
