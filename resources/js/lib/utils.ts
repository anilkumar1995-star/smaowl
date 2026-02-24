import { InertiaLinkProps } from '@inertiajs/react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function isSameUrl(
    url1: NonNullable<InertiaLinkProps['href']>,
    url2: NonNullable<InertiaLinkProps['href']>,
) {
    return resolveUrl(url1) === resolveUrl(url2);
}

export function resolveUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    const raw = typeof url === 'string' ? url : url.url;

    // If it's an absolute URL or a hash or protocol-relative, return as-is
    if (/^(?:https?:)?\/\//.test(raw) || raw.startsWith('#')) return raw;

    // Ensure path starts with a single leading slash so browsers treat it as absolute
    if (!raw.startsWith('/')) return '/' + raw;

    return raw;
}
