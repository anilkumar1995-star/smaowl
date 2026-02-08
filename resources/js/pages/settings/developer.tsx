import SettingsLayout from '@/layouts/settings/layout';
import { Head, Link, usePage } from '@inertiajs/react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';

export default function DeveloperSettings() {
    const { props } = usePage<any>();
    const isAdmin = props?.auth?.isAdmin || props?.is_admin || false;
    const devEnabled = props?.developer_controls || false;

    // Require authentication
    const isAuthenticated = !!props?.auth?.user;
    if (!isAuthenticated) {
        return <SettingsLayout><div>You must be signed in to access this page.</div></SettingsLayout>;
    }

    if (!devEnabled && !isAdmin) {
        return <SettingsLayout><div>Developer features are disabled.</div></SettingsLayout>;
    }

    return (
        <>
            <Head title="Developer settings" />

            <SettingsLayout>
                <Heading title="Developer settings" description="Manage developer features and links" />

                <div className="space-y-4">
                    <div className="rounded border p-4">
                        <h3 className="font-medium">Developer Controls</h3>
                        <p className="text-sm text-muted-foreground">
                            Feature-flagged: {devEnabled ? 'Enabled' : 'Disabled'} (set DEVELOPER_CONTROLS_ENABLED in .env)
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <Link href="/admin/developer/keys">
                            <Button>Open Developer API Keys</Button>
                        </Link>
                    </div>
                </div>
            </SettingsLayout>
        </>
    );
}
