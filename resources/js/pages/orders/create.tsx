import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { orders } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

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

interface Service {
    service: number;
    name: string;
    type: string;
    category: string;
    rate: string;
    min: number;
    max: number;
    refill: boolean;
    cancel: boolean;
}

interface CreateOrderProps {
    services: Service[];
}

export default function CreateOrder({ services }: CreateOrderProps) {
    const { data, setData, post, processing, errors } = useForm({
        service: '',
        link: '',
        quantity: '',
    });

    const selectedService = services.find(s => s.service.toString() === data.service);

    const calculateCost = () => {
        if (!selectedService || !data.quantity) return 0;
        const quantity = parseInt(data.quantity);
        const rate = parseFloat(selectedService.rate);
        return (rate * quantity) / 100; // Assuming rate is per 100
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(orders.store().url);
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
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <Label htmlFor="service">Service</Label>
                                <Select value={data.service} onValueChange={(value) => setData('service', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a service" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {services && services.length > 0 ? (
                                            services.map((service) => (
                                                <SelectItem key={service.service} value={service.service.toString()}>
                                                    {service.name} - ₹{service.rate}/100
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <SelectItem value="" disabled>
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