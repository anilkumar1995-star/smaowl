import AppLogoIcon from '@/components/app-logo-icon';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Menu, LogIn, UserPlus } from 'lucide-react';

export default function PublicLayout({ children }: PropsWithChildren<unknown>) {
    const page = usePage();
    const auth = (page.props as any).auth;

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-black text-[var(--foreground)]">
            <header className="border-b py-4 public-header">
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="h-8 w-8">
                            <AppLogoIcon />
                        </div>
                        <span className="brand">MyCompany</span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-4">
                        <Link href="/services" className="text-sm text-muted-foreground">Services</Link>
                        <Link href="/about" className="text-sm text-muted-foreground">About</Link>
                        <Link href="/contact" className="text-sm text-muted-foreground">Contact</Link>
                        <Link href="/api-docs" className="text-sm text-muted-foreground">API</Link>
                        <Link href="/terms" className="text-sm text-muted-foreground">Terms</Link>

                        {auth?.user ? (
                            <Link href="/dashboard" className="text-sm px-3 py-1 rounded-md border border-transparent hover:bg-gray-100 dark:hover:bg-gray-800">Account</Link>
                        ) : (
                            <>
                                <Link href="/login" className="text-sm text-muted-foreground px-3 py-1">Sign In</Link>
                                <Link href="/register" className="ml-2 btn-primary">Sign Up</Link>
                            </>
                        )}
                    </nav>

                    {/* Mobile menu trigger */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <button aria-label="Open menu" className="p-2 rounded-md">
                                    <Menu className="size-5" />
                                </button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <SheetHeader>
                                    <SheetTitle>Menu</SheetTitle>
                                </SheetHeader>

                                <div className="flex flex-col gap-3 p-4">
                                    <Link href="/services" className="text-base">Services</Link>
                                    <Link href="/about" className="text-base">About</Link>
                                    <Link href="/contact" className="text-base">Contact</Link>
                                    <Link href="/api-docs" className="text-base">API</Link>
                                    <Link href="/terms" className="text-base">Terms</Link>

                                    <div className="mt-4 border-t pt-4 flex flex-col gap-2">
                                        {auth?.user ? (
                                            <Link href="/dashboard" className="flex items-center gap-2">Account</Link>
                                        ) : (
                                            <>
                                                <Link href="/login" className="flex items-center gap-2"><LogIn /> Sign In</Link>
                                                <Link href="/register" className="flex items-center gap-2"><UserPlus /> Sign Up</Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
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
