import PublicLayout from '@/layouts/public-layout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link as InertiaLink } from '@inertiajs/react';

export default function Terms() {
    return (
        <PublicLayout>
            <Head title="Terms of Use" />

            <div className="max-w-6xl mx-auto py-12 px-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    <aside className="md:col-span-3">
                        <div className="sticky top-24">
                            <h3 className="text-lg font-semibold mb-4">On this page</h3>
                            <nav className="flex flex-col gap-2 text-sm">
                                <a href="#general" className="text-muted-foreground hover:text-white">General Info</a>
                                <a href="#disclaimer" className="text-muted-foreground hover:text-white">Disclaimer & Liabilities</a>
                                <a href="#payments" className="text-muted-foreground hover:text-white">Payment & Refunds</a>
                                <a href="#contact" className="text-muted-foreground hover:text-white">Contact</a>
                            </nav>

                            <div className="mt-6 border-t pt-4">
                                <InertiaLink href="/services" className="block text-sm text-blue-500 hover:underline">Browse Services</InertiaLink>
                                <InertiaLink href="/api-docs" className="block text-sm text-blue-500 hover:underline mt-2">API Docs</InertiaLink>
                            </div>
                        </div>
                    </aside>

                    <section className="md:col-span-9">
                        <Card className="bg-white/5 border-transparent">
                            <CardHeader>
                                <CardTitle>Terms and Conditions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <article className="prose prose-invert max-w-none">
                                    <section id="general">
                                        <h2>General Info</h2>
                                        <p>By placing an order with HonestSMM, you accept the terms of service. We reserve the right to change these terms without notice. You must comply with the Terms of Service of the social platforms you use (Instagram, Facebook, Twitter, YouTube, etc.). Rates are subject to change and delivery times are estimates only.</p>
                                        <p>HonestSMM does not guarantee delivery time for any services — any times shown are estimates only. We may change service type or details if necessary to complete an order.</p>
                                    </section>

                                    <section id="disclaimer">
                                        <h2>Disclaimer & Liabilities</h2>
                                        <p>HonestSMM is not responsible for any damages you or your business may suffer. We are not liable for any account suspension or content removal performed by social platforms. Use our services at your own risk and ensure you follow the relevant platform policies.</p>
                                    </section>

                                    <section id="payments">
                                        <h2>Payment & Refunds</h2>
                                        <p>Payment and refund policies apply as described on the site. We reserve the right to refuse, delay, or cancel orders if we detect a policy violation or other issues. Rate changes may affect pricing; refunds for ongoing orders are handled according to the refund policy.</p>
                                    </section>

                                    <section id="contact">
                                        <h2>Contact</h2>
                                        <p>If you need assistance, contact <a href="mailto:support@honestsmm.com" className="text-blue-400">support@honestsmm.com</a>.</p>
                                    </section>

                                    <p className="mt-6 text-sm text-muted-foreground">This content is provided for informational purposes and mirrors publicly available terms from HonestSMM. Refer to the original host for authoritative terms.</p>
                                </article>
                            </CardContent>
                        </Card>
                    </section>
                </div>
            </div>
        </PublicLayout>
    );
}
