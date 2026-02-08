import PublicLayout from '@/layouts/public-layout';
import { Head, Link } from '@inertiajs/react';

export default function Landing() {
    return (
        <PublicLayout>
            <Head title="Home" />

            {/* Improved hero with split layout and visual */}
            <section className="bg-white dark:bg-gray-900 py-20">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">Real, Safe Social Growth — Fast Delivery</h1>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-xl">We provide high-quality, reliable social media services with transparent pricing and secure payments. Scale your accounts confidently with a platform trusted by thousands.</p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link href="/orders/create" className="inline-block bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold px-6 py-3 rounded-md shadow-lg">Create Order</Link>
                            <Link href="/services" className="inline-block border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 px-6 py-3 rounded-md">View Services</Link>
                        </div>

                        <div className="mt-6 flex items-center gap-6">
                            <div className="text-sm">
                                <div className="font-bold text-lg">99.5%</div>
                                <div className="text-muted-foreground">Completion rate</div>
                            </div>
                            <div className="h-8 border-l" />
                            <div className="text-sm">
                                <div className="font-bold text-lg">24/7</div>
                                <div className="text-muted-foreground">Support</div>
                            </div>
                            <div className="h-8 border-l" />
                            <div className="text-sm">
                                <div className="font-bold text-lg">Secure</div>
                                <div className="text-muted-foreground">Payments</div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="rounded-xl overflow-hidden shadow-xl bg-gradient-to-tr from-indigo-600 to-pink-500 p-6 text-white">
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-sm opacity-90">Order preview</div>
                                    <div className="mt-2 font-bold text-2xl">Instagram Followers</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs opacity-80">Qty</div>
                                    <div className="font-semibold">5,000</div>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-4">
                                <div className="p-3 bg-white/10 rounded">Price</div>
                                <div className="p-3 bg-white/10 rounded">$49.00</div>
                                <div className="p-3 bg-white/10 rounded">ETA</div>
                                <div className="p-3 bg-white/10 rounded">3-7 days</div>
                            </div>

                            <div className="mt-6 flex gap-3">
                                <Link href="/orders/create" className="inline-block bg-white text-indigo-700 px-4 py-2 rounded font-semibold">Order Now</Link>
                                <Link href="/contact" className="inline-block border border-white/30 px-4 py-2 rounded">Contact Sales</Link>
                            </div>
                        </div>

                        <svg className="absolute -bottom-8 right-8 opacity-20 w-40 h-40" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#fff" d="M40,-60C52.6,-48.5,64.4,-36.8,72.4,-22.8C80.3,-8.8,84.4,8,78.7,23.2C73,38.4,57.6,51.9,40.3,59.6C23,67.3,3.8,69.3,-11,64.8C-25.8,60.3,-36.9,49.3,-48.7,37.3C-60.5,25.3,-73,12.6,-78.9,-1.9C-84.8,-16.3,-84.1,-32.6,-75.2,-45.2C-66.3,-57.8,-49.1,-66.6,-32.8,-73.2C-16.5,-79.9,-8.3,-84.4,4.8,-92.4C17.9,-100.4,35.8,-111.6,40,-116Z" transform="translate(100 100)"/>
                        </svg>
                    </div>
                </div>
            </section>

            {/* Services / Features */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center">Our Services</h2>
                    <p className="mt-3 text-center text-gray-600 dark:text-gray-300">Choose from a variety of services for Instagram, TikTok, YouTube, and more.</p>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 border rounded-lg hover:shadow-lg transition">
                            <div className="text-3xl">📈</div>
                            <h3 className="mt-4 font-semibold">Followers</h3>
                            <p className="text-sm text-muted-foreground mt-2">High-quality followers to boost account credibility.</p>
                        </div>
                        <div className="p-6 border rounded-lg hover:shadow-lg transition">
                            <div className="text-3xl">💬</div>
                            <h3 className="mt-4 font-semibold">Comments</h3>
                            <p className="text-sm text-muted-foreground mt-2">Engaging comments to increase activity and reach.</p>
                        </div>
                        <div className="p-6 border rounded-lg hover:shadow-lg transition">
                            <div className="text-3xl">▶️</div>
                            <h3 className="mt-4 font-semibold">Views & Likes</h3>
                            <p className="text-sm text-muted-foreground mt-2">Boost visibility with guaranteed view and like packages.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust strip and pricing CTA */}
            <section className="bg-gray-50 dark:bg-gray-900 py-12">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <div className="flex flex-wrap justify-center items-center gap-8">
                        <div className="text-center">
                            <div className="font-bold text-xl">Trusted by</div>
                            <div className="text-sm text-muted-foreground">Top resellers and hundreds of businesses</div>
                        </div>
                        <div className="flex gap-6 items-center opacity-80">
                            <div className="w-20 h-10 bg-white/80 rounded shadow" />
                            <div className="w-20 h-10 bg-white/80 rounded shadow" />
                            <div className="w-20 h-10 bg-white/80 rounded shadow" />
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 bg-white rounded-lg shadow">
                            <h4 className="font-semibold">Starter</h4>
                            <div className="mt-2 text-2xl font-bold">$19</div>
                            <p className="text-sm text-muted-foreground mt-2">Basic packs for testing and small growth.</p>
                        </div>
                        <div className="p-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg shadow-lg text-black">
                            <h4 className="font-semibold">Popular</h4>
                            <div className="mt-2 text-2xl font-bold">$49</div>
                            <p className="text-sm mt-2">Best value for consistent growth and reliability.</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow">
                            <h4 className="font-semibold">Pro</h4>
                            <div className="mt-2 text-2xl font-bold">$99</div>
                            <p className="text-sm text-muted-foreground mt-2">High-volume packages for agencies and resellers.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white dark:bg-gray-900 border-t mt-12">
                <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-start gap-6">
                    <div>
                        <div className="font-bold text-xl">SmaOwl</div>
                        <div className="text-sm text-muted-foreground mt-2">Fast, secure social services with transparent pricing.</div>
                    </div>

                    <div className="flex gap-8 w-full md:w-auto">
                        <div>
                            <div className="font-semibold">Products</div>
                            <ul className="mt-2 text-sm text-muted-foreground">
                                <li className="mt-2"><Link href="/services">Services</Link></li>
                                <li className="mt-2"><Link href="/orders/create">Create Order</Link></li>
                            </ul>
                        </div>
                        <div>
                            <div className="font-semibold">Company</div>
                            <ul className="mt-2 text-sm text-muted-foreground">
                                <li className="mt-2"><Link href="/about">About</Link></li>
                                <li className="mt-2"><Link href="/contact">Contact</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </PublicLayout>
    );
}
