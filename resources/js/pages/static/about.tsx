import PublicLayout from '@/layouts/public-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Home', href: '/' },
    { title: 'About', href: '/about' },
];

export default function About() {
    return (
        <PublicLayout>
            <Head title="About Us" />
            <div className="max-w-4xl mx-auto prose">
                <h1>About Us</h1>
                <p>This is the About page. Describe your company here.</p>
            </div>
        </PublicLayout>
    );
}
