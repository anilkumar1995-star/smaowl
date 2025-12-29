import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import payments from '@/routes/payments';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Add Funds',
        href: payments.create().url,
    },
];

export default function AddFunds({ razorpay_key }: { razorpay_key: string }) {
    const [isProcessing, setIsProcessing] = useState(false);

    const { data, setData, errors, post } = useForm({
        amount: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            const response = await fetch(payments.order().url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({ amount: parseFloat(data.amount) }),
            });

            const orderData = await response.json();

            if (orderData.error) {
                alert(orderData.error);
                setIsProcessing(false);
                return;
            }

            // Initialize Razorpay
            const options = {
                key: razorpay_key,
                amount: orderData.amount,
                currency: orderData.currency,
                order_id: orderData.order_id,
                name: 'Your App',
                description: 'Add Funds',
                theme: {
                    color: '#1b1b18'
                },
                handler: async function (response: any) {
                    // Handle success
                    await fetch(payments.success().url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                        },
                        body: JSON.stringify({
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                        }),
                    });

                    alert('Payment successful! Funds added to your account.');
                    window.location.href = dashboard().url;
                },
                modal: {
                    ondismiss: function() {
                        setIsProcessing(false);
                    },
                    failure: function(response: any) {
                        console.log('Payment failure response:', response);
                        const errorMsg = response?.error?.description || response?.error_description || response?.message || 'Payment failed';
                        alert('Payment failed: ' + errorMsg);
                        setIsProcessing(false);
                    }
                }
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();

        } catch (error) {
            alert('Payment failed. Please try again.');
            setIsProcessing(false);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Funds">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
                <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
            </Head>

            <div className="flex min-h-screen flex-col items-center justify-center bg-[#FDFDFC] p-6 text-[#1b1b18]">
                <div className="mx-auto w-full max-w-md">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">Add Funds</h1>
                        <p className="mt-2 text-[#706f6c] dark:text-[#A3A3A1]">Securely add money to your account</p>
                    </div>

                    <Card className="border-[#19140035] shadow-lg dark:border-[#3E3E3A]">
                        <CardHeader className="text-center">
                            <CardTitle className="text-xl">Payment Details</CardTitle>
                            <CardDescription>
                                Enter the amount you want to add
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="amount" className="text-sm font-medium">Amount (INR)</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#706f6c] dark:text-[#A3A3A1]">₹</span>
                                        <Input
                                            id="amount"
                                            type="number"
                                            min="1"
                                            max="100000"
                                            step="0.01"
                                            value={data.amount}
                                            onChange={(e) => setData('amount', e.target.value)}
                                            placeholder="0.00"
                                            className="pl-8"
                                            required
                                        />
                                    </div>
                                    {errors.amount && (
                                        <p className="text-sm text-red-600 dark:text-red-400">{errors.amount}</p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-[#1b1b18] text-white hover:bg-[#2a2a27] dark:bg-[#EDEDEC] dark:text-[#1b1b18] dark:hover:bg-[#D4D4D2]"
                                    disabled={isProcessing || !data.amount}
                                >
                                    {isProcessing ? (
                                        <>
                                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                            Processing...
                                        </>
                                    ) : (
                                        `Add ₹${data.amount || '0'}`
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <div className="mt-6 text-center text-sm text-[#706f6c] dark:text-[#A3A3A1]">
                        <p>Powered by Razorpay • Secure & Encrypted</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}