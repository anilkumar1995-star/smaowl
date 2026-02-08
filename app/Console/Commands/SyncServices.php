<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Models\Service;

class SyncServices extends Command
{
    protected $signature = 'services:sync {--force : Ignore cache and re-fetch}';
    protected $description = 'Fetch external service list and upsert into local services table';

    public function handle()
    {
        $this->info('Fetching external services...');

        try {
            $response = Http::withoutVerifying()->timeout(20)->get('https://socialsparksmm.com/api/services/page', [
                'v' => '3',
                'full' => 'false',
            ]);

            if ($response->failed()) {
                $this->error('External API returned status: ' . $response->status());
                Log::warning('services:sync failed', ['status' => $response->status()]);
                return 1;
            }

            $payload = $response->json() ?? [];

            $groups = [];

            if (isset($payload['data']['categories']) && is_array($payload['data']['categories'])) {
                $groups = $payload['data']['categories'];
            } elseif (isset($payload['services']) && is_array($payload['services'])) {
                $groups = $payload['services'];
            } elseif (is_array($payload) && count($payload) && isset($payload[0]['service'])) {
                // flat list
                $groups = [
                    ['id' => 'all', 'name' => 'All Services', 'services' => $payload],
                ];
            }

            $count = 0;
            foreach ($groups as $cat) {
                $categoryName = $cat['name'] ?? ($cat['category'] ?? null);
                $services = $cat['services'] ?? ($cat['services'] ?? []);
                foreach ($services as $s) {
                    $externalId = $s['service'] ?? $s['id'] ?? null;
                    if (is_null($externalId)) continue;

                    $data = [
                        'external_id' => (string)$externalId,
                        'name' => $s['name'] ?? ($s['service'] ?? ''),
                        'category' => $categoryName,
                        'rate' => (float)($s['rate'] ?? $s['price'] ?? 0),
                        'min' => (int)($s['min'] ?? 1),
                        'max' => (int)($s['max'] ?? 1000),
                        'refill' => isset($s['refill']) ? (bool)$s['refill'] : false,
                        'cancel' => isset($s['cancel']) ? (bool)$s['cancel'] : false,
                        'meta' => $s,
                    ];

                    Service::updateOrCreate(
                        ['external_id' => $data['external_id']],
                        $data
                    );

                    $count++;
                }
            }

            $this->info("Synced {$count} services");
            return 0;
        } catch (\Exception $e) {
            Log::error('services:sync exception', ['message' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            $this->error('Exception: ' . $e->getMessage());
            return 1;
        }
    }
}
