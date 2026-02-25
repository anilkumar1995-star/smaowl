import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import orders from '@/routes/orders';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';
import { FormEventHandler, useState, useEffect, useRef } from 'react';
import { usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Create Order',
        href: orders.create().url,
    },
];

interface SubService {
    service: number;
    name: string;
    type?: string;
    category?: string;
    rate: string;
    min?: number;
    max?: number;
    refill?: boolean;
    cancel?: boolean;
}

interface ServiceGroup {
    id: number | string;
    name: string;
    services: SubService[];
}

interface CreateOrderProps {
    serviceGroups: ServiceGroup[];
}

export default function CreateOrder({ serviceGroups }: CreateOrderProps) {
    // Seed `service` from query param to improve initial render selection
    const initialService = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('service') ?? '' : '';
    const { data, setData, errors } = useForm({
        service: initialService,
        link: '',
        quantity: '',
    });
    const [submitting, setSubmitting] = useState(false);

    const [selectedGroup, setSelectedGroup] = useState('');
    const [selectedServiceVal, setSelectedServiceVal] = useState(initialService);

    // When serviceGroups prop arrives/changes, set a default selected group if none selected
    useEffect(() => {
        if (!selectedGroup && serviceGroups && serviceGroups.length > 0) {
            setSelectedGroup(serviceGroups[0].id.toString());
        }
    }, [serviceGroups]);

    // If a `service` query param is present, preselect that service and its group
    useEffect(() => {
        try {
            const params = new URLSearchParams(window.location.search);
            const svc = params.get('service');
            if (!svc) return;

            // find which group contains this service and set both group+service synchronously
            for (const g of serviceGroups) {
                const found = (g.services || []).find((s) => s.service?.toString() === svc.toString());
                if (found) {
                    setSelectedGroup(g.id.toString());
                    setSelectedServiceVal(found.service.toString());
                    setData('service', found.service.toString());

                    // if quantity has no min/default, set to min
                    if (!data.quantity && found.min) {
                        setData('quantity', String(found.min));
                    }

                    // UX: scroll form into view, focus quantity, and show a small toast so user notices the preselection
                    try {
                        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        setTimeout(() => {
                            const qty = document.getElementById('quantity') as HTMLInputElement | null;
                            qty?.focus();
                        }, 300);

                        Swal.fire({
                            toast: true,
                            position: 'top-end',
                            icon: 'info',
                            title: `Preselected: ${found.name}`,
                            showConfirmButton: false,
                            timer: 2200,
                        });
                    } catch (e) {
                        // ignore UX failures
                    }

                    break;
                }
            }
        } catch (e) {
            // ignore
        }
    }, [serviceGroups]);

    // Also react to serviceGroups loading when the form already has a service value
    useEffect(() => {
        try {
            const svc = data.service || selectedServiceVal;
            if (!svc) return;

            for (const g of serviceGroups) {
                const found = (g.services || []).find((s) => s.service?.toString() === svc.toString());
                if (found) {
                    // ensure both category and service UI values are set
                    setSelectedGroup(g.id.toString());
                    setSelectedServiceVal(found.service.toString());
                    // ensure form value set
                    setData('service', found.service.toString());

                    // set quantity default if missing
                    if (!data.quantity && found.min) {
                        setData('quantity', String(found.min));
                    }

                    break;
                }
            }
        } catch (e) {
            // ignore
        }
    }, [serviceGroups, data.service, selectedServiceVal]);

    const subServices = serviceGroups.find(g => g.id.toString() === selectedGroup)?.services ?? [];

    const selectedService = subServices.find(s => s.service.toString() === (data.service || selectedServiceVal));

    const calculateCost = () => {
        if (!selectedService || !data.quantity) return 0;
        const quantity = parseInt(data.quantity);
        const rate = parseFloat(selectedService.rate);
        return (rate * quantity) / 1000; // Assuming rate is per 100
    };

    const formRef = useRef<HTMLFormElement | null>(null);

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const csrf = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '';

        try {
            const res = await fetch(orders.store().url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf,
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data),
            });

            let payload: any = null;
            try { payload = await res.json(); } catch (err) { payload = null; }

            if (!res.ok) {
                // gather messages from JSON payload if present
                const messages: string[] = [];
                if (payload && payload.errors) {
                    const errs = payload.errors;
                    Object.keys(errs).forEach((k) => {
                        const v = errs[k];
                        if (Array.isArray(v)) messages.push(...v.map(String));
                        else messages.push(String(v));
                    });
                } else if (payload && payload.error) {
                    messages.push(String(payload.error));
                } else {
                    messages.push(res.statusText || 'Request failed');
                }

                await Swal.fire({
                    title: 'Order failed',
                    html: `<div style="text-align:left">${messages.map(m => `<div>• ${m}</div>`).join('')}</div>`,
                    icon: 'error',
                });
            } else {
                const appOrder = payload?.app_order || payload?.order || null;
                const id = appOrder?.id ?? null;

                await Swal.fire({
                    title: appOrder ? 'Order placed' : 'Success',
                    text: appOrder ? `Order #${id} placed successfully` : (payload?.message ?? 'Your order was placed successfully.'),
                    icon: 'success',
                });

                setData('service', '');
                setData('link', '');
                setData('quantity', '');
            }
        } catch (err: any) {
            await Swal.fire({ title: 'Order failed', text: err?.message || 'Network error', icon: 'error' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Order" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Create Order</h1>
                        <p className="text-muted-foreground">
                            Place an order for social media services
                        </p>
                    </div>
                </div>

                

                <Card>
                    <CardHeader>
                        <CardTitle>Order Details</CardTitle>
                        <CardDescription>
                            Select a service and provide the required information
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form ref={formRef} onSubmit={submit} className="space-y-4" id="order-form">
                            <div>
                                <Label htmlFor="group">Category</Label>
                                <Select value={selectedGroup} onValueChange={(value) => { setSelectedGroup(value); setData('service', ''); }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {serviceGroups && serviceGroups.length > 0 ? (
                                            serviceGroups.map((group) => (
                                                <SelectItem key={group.id} value={group.id.toString()}>
                                                    {group.name}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <SelectItem value="none" disabled>
                                                No categories
                                            </SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="service">Service</Label>
                                <Select value={selectedServiceVal} onValueChange={(value) => { setData('service', value); setSelectedServiceVal(value); }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a service" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {subServices && subServices.length > 0 ? (
                                            subServices.map((service) => (
                                                <SelectItem key={service.service} value={service.service.toString()}>
                                                    {service.name} - ₹{service.rate}/100
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <SelectItem value="none" disabled>
                                                No services available
                                            </SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                                {errors.service && <p className="text-sm text-red-500">{errors.service}</p>}
                            </div>

                            {selectedService && (
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Category: {selectedService.category}<br />
                                        Min: {selectedService.min}, Max: {selectedService.max}<br />
                                        Refill: {selectedService.refill ? 'Yes' : 'No'}, Cancel: {selectedService.cancel ? 'Yes' : 'No'}
                                    </p>
                                </div>
                            )}

                            <div>
                                <Label htmlFor="link">Link</Label>
                                <Input
                                    id="link"
                                    type="url"
                                    value={data.link}
                                    onChange={(e) => setData('link', e.target.value)}
                                    placeholder="https://instagram.com/username"
                                />
                                {errors.link && <p className="text-sm text-red-500">{errors.link}</p>}
                            </div>

                            <div>
                                <Label htmlFor="quantity">Quantity</Label>
                                <Input
                                    id="quantity"
                                    type="number"
                                    value={data.quantity}
                                    onChange={(e) => setData('quantity', e.target.value)}
                                    min={selectedService?.min}
                                    max={selectedService?.max}
                                />
                                {errors.quantity && <p className="text-sm text-red-500">{errors.quantity}</p>}
                            </div>

                            {selectedService && data.quantity && (
                                <div>
                                    <p className="text-sm font-medium">
                                        Cost: ₹{calculateCost().toFixed(2)}
                                    </p>
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={submitting}
                                onClick={() => {
                                    // Ensure form is submitted even if native submit is blocked by overlay or layout issues
                                    try {
                                        formRef.current?.requestSubmit?.();
                                    } catch (e) {
                                        // ignore - fallback to normal submit via button
                                    }
                                }}
                            >
                                Place Order
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}