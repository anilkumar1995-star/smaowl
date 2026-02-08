import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

export default function PublicLayout({ children }: PropsWithChildren<unknown>) {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-black text-[var(--foreground)]">
            <header className="border-b py-4">
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="h-8 w-8">
                            <AppLogoIcon />
                        </div>
                        <span className="font-semibold">MyCompany</span>
                    </Link>
                    <nav className="space-x-4">
                        <Link href="/services" className="text-sm text-muted-foreground">Services</Link>
                        <Link href="/about" className="text-sm text-muted-foreground">About</Link>
                        <Link href="/contact" className="text-sm text-muted-foreground">Contact</Link>
                        <Link href="/api-docs" className="text-sm text-muted-foreground">API</Link>
                        <Link href="/terms" className="text-sm text-muted-foreground">Terms</Link>
                    </nav>
                </div>
            </header>

            <main className="flex-1 container mx-auto px-4 py-10">
                {children}
            </main>

            <footer className="border-t py-6">
                <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">© {new Date().getFullYear()} MyCompany. All rights reserved.</div>
            </footer>
        </div>
    );
}
