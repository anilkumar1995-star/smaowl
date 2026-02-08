import PublicLayout from '@/layouts/public-layout';
import { Head, Link } from '@inertiajs/react';

const sections = [
    { id: 'overview', title: 'Overview' },
    { id: 'auth', title: 'Authentication' },
    { id: 'endpoints', title: 'Endpoints' },
    { id: 'examples', title: 'Examples' },
    { id: 'errors', title: 'Errors' },
    { id: 'limits', title: 'Rate Limits' },
];

export default function ApiDocs() {
    return (
        <PublicLayout>
            <Head title="API" />

            <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-4 gap-8 bg-black text-white min-h-screen py-12 px-6">
                <aside className="hidden lg:block col-span-1 sticky top-24">
                    <nav className="space-y-3">
                        <h4>API</h4>
                        {sections.map((s) => (
                            <a key={s.id} href={`#${s.id}`} className="block text-sm text-gray-300 hover:text-white">
                                {s.title}
                            </a>
                        ))}
                        <div className="mt-6">
                            <Link href="/terms" className="text-xs text-gray-500">Terms</Link>
                        </div>
                    </nav>
                </aside>

                <main className="col-span-3 prose prose-invert max-w-none text-lg">
                    <h1>API</h1>

                    <section id="overview">
                        <h2>Overview</h2>
                        <p>
                            Our API provides simple endpoints to query services, create orders, check
                            status and fetch balance information. All endpoints respond with JSON and
                            are designed for programmatic integration with your control panel or scripts.
                        </p>
                    </section>

                    <section id="auth">
                        <h2>Authentication</h2>
                        <p>
                            API requests must include an API key. Pass your API key as the
                            `api_key` parameter in POST requests or as the `Authorization: Bearer &lt;key&gt;` header.
                        </p>

                        <pre className="bg-white/5 p-4 rounded-lg border border-white/10"><code>Authorization: Bearer YOUR_API_KEY</code></pre>
                    </section>

                    <section id="endpoints">
                        <h2>Endpoints</h2>

                        <h3>Services</h3>
                        <p>Retrieve available services and metadata.</p>
                        <pre className="bg-white/5 p-4 rounded-lg border border-white/10"><code>GET /api/services</code></pre>

                        <h3>Balance</h3>
                        <p>Get your account balance.</p>
                        <pre className="bg-white/5 p-4 rounded-lg border border-white/10"><code>GET /api/balance</code></pre>

                        <h3>Create Order</h3>
                        <p>Create a new order for a service.</p>
                        <pre className="bg-white/5 p-4 rounded-lg border border-white/10"><code>POST /api/orders/add</code></pre>
                        <p>Parameters:</p>
                        <ul>
                            <li><strong>service</strong>: service id (string)</li>
                            <li><strong>link</strong>: target url or username</li>
                            <li><strong>quantity</strong>: integer (amount)</li>
                        </ul>

                        <h3>Order Status</h3>
                        <p>Fetch the status of an existing order.</p>
                        <pre className="bg-gray-100 p-3 rounded"><code>GET /api/orders/status?order=ORDER_ID</code></pre>
                    </section>

                    <section id="examples">
                        <h2>Examples</h2>

                        <h4>Create order (curl)</h4>
                        <pre className="bg-white/5 p-4 rounded-lg border border-white/10 text-sm overflow-x-auto"><code>curl -X POST "https://your-site.test/api/orders/add" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d "service=123&link=https://example.com/post/1&quantity=100"
                        </code></pre>

                        <h4>Response (success)</h4>
                                                <pre className="bg-white/5 p-4 rounded-lg border border-white/10"><code>{`{
    "order": 987654,
    "charge": "10.00",
    "currency": "USD"
}`}</code></pre>

                        <h4>Response (error)</h4>
                                                <pre className="bg-white/5 p-4 rounded-lg border border-white/10"><code>{`{
    "error": "Invalid API key"
}`}</code></pre>

                                                <h4>Provider status check</h4>
                                                <p>Example provider status endpoint and response:</p>
                                                <pre className="bg-white/5 p-4 rounded-lg border border-white/10 text-sm overflow-x-auto"><code>GET https://socialsparksmm.com/api/v2?action=status&order=1&key=YOUR_KEY</code></pre>

                                                <h5>Sample response</h5>
                                                <pre className="bg-white/5 p-4 rounded-lg border border-white/10"><code>{`{
    "charge": "0.27819",
    "start_count": "3572",
    "status": "Partial",
    "remains": "157",
    "currency": "USD"
}`}</code></pre>
                    </section>

                    <section id="errors">
                        <h2>Errors</h2>
                        <p>Standard HTTP status codes are used. Error responses include an `error` message.</p>
                        <ul>
                            <li><strong>400</strong> — Bad request (missing params)</li>
                            <li><strong>401</strong> — Unauthorized (invalid API key)</li>
                            <li><strong>422</strong> — Validation failed</li>
                        </ul>
                    </section>

                    <section id="limits">
                        <h2>Rate Limits</h2>
                        <p>To protect the API we enforce reasonable rate limits. If you expect high
                        usage please contact support.</p>
                    </section>

                    <p className="text-sm text-gray-600">For additional help, open a support ticket or check Terms of Use.</p>
                </main>
            </div>
        </PublicLayout>
    );
}
