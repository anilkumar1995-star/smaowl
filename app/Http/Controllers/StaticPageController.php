<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Service;

class StaticPageController extends Controller
{
    public function about()
    {
        return Inertia::render('static/about', [
            'title' => 'About Us',
        ]);
    }

    public function contact()
    {
        return Inertia::render('static/contact', [
            'title' => 'Contact Us',
        ]);
    }

    public function services()
    {
        $services = Service::orderBy('category')->orderBy('name')->get()->groupBy(function ($s) {
            return $s->category ?? 'Other';
        });

        $groups = [];
        foreach ($services as $category => $items) {
            $groups[] = [
                'id' => $category,
                'name' => $category,
                'services' => $items->map(function ($s) {
                    return [
                        'service' => $s->external_id,
                        'name' => $s->name,
                        'rate' => (string)$s->rate,
                        'min' => $s->min,
                        'max' => $s->max,
                        'refill' => (bool)$s->refill,
                        'cancel' => (bool)$s->cancel,
                    ];
                })->values()->toArray(),
            ];
        }

        return Inertia::render('static/services', [
            'title' => 'Services',
            'serviceGroups' => $groups,
        ]);
    }

    public function api()
    {
        return Inertia::render('static/api', [
            'title' => 'API',
        ]);
    }

    public function terms()
    {
        return Inertia::render('static/terms', [
            'title' => 'Terms of Use',
        ]);
    }

    public function home()
    {
        return Inertia::render('static/landing', [
            'title' => 'Welcome',
        ]);
    }
}
