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
import { FormEventHandler, useState, useEffect } from 'react';

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
    const { data, setData, post, processing, errors } = useForm({
        service: '',
        link: '',
        quantity: '',
    });

    const [selectedGroup, setSelectedGroup] = useState('');

    // When serviceGroups prop arrives/changes, set a default selected group if none selected
    useEffect(() => {
        if (!selectedGroup && serviceGroups && serviceGroups.length > 0) {
            setSelectedGroup(serviceGroups[0].id.toString());
        }
    }, [serviceGroups]);

    const subServices = serviceGroups.find(g => g.id.toString() === selectedGroup)?.services ?? [];

    const selectedService = subServices.find(s => s.service.toString() === data.service);

    const calculateCost = () => {
        if (!selectedService || !data.quantity) return 0;
        const quantity = parseInt(data.quantity);
        const rate = parseFloat(selectedService.rate);
        return (rate * quantity) / 100; // Assuming rate is per 100
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(orders.store().url, {
            onError: (errs) => {
                // If server returned a non-field error under 'server', show Swal
                if (errs?.server) {
                    Swal.fire({
                        title: 'Order failed',
                        text: errs.server,
                        icon: 'error',
                    });
                }
            },
            onSuccess: (resp: any) => {
                // If backend returned our saved app order, show that id and message
                if (resp?.app_order) {
                    Swal.fire({
                        title: 'Order placed',
                        text: `Order #${resp.app_order.id} placed successfully`,
                        icon: 'success',
                    }).then(() => {
                        // reset form
                        setData('service', '');
                        setData('link', '');
                        setData('quantity', '');
                    });
                } else {
                    Swal.fire({
                        title: 'Order placed',
                        text: 'Your order was placed successfully.',
                        icon: 'success',
                    }).then(() => {
                        setData('service', '');
                        setData('link', '');
                        setData('quantity', '');
                    });
                }
            }
        });
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

                {/* Debug: show serviceGroups and selectedGroup in dev */}
                <div className="mt-2">
                    <pre className="text-xs text-muted-foreground">{JSON.stringify({ count: serviceGroups?.length ?? 0, selectedGroup }, null, 2)}</pre>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Order Details</CardTitle>
                        <CardDescription>
                            Select a service and provide the required information
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
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
                                <Select value={data.service} onValueChange={(value) => setData('service', value)}>
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

                            <Button type="submit" disabled={processing}>
                                Place Order
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}