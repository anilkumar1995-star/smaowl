import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DashboardController::stats
 * @see app/Http/Controllers/DashboardController.php:14
 * @route '/dashboard/stats'
 */
export const stats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})

stats.definition = {
    methods: ["get","head"],
    url: '/dashboard/stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::stats
 * @see app/Http/Controllers/DashboardController.php:14
 * @route '/dashboard/stats'
 */
stats.url = (options?: RouteQueryOptions) => {
    return stats.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::stats
 * @see app/Http/Controllers/DashboardController.php:14
 * @route '/dashboard/stats'
 */
stats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stats.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DashboardController::stats
 * @see app/Http/Controllers/DashboardController.php:14
 * @route '/dashboard/stats'
 */
stats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: stats.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DashboardController::stats
 * @see app/Http/Controllers/DashboardController.php:14
 * @route '/dashboard/stats'
 */
    const statsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: stats.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DashboardController::stats
 * @see app/Http/Controllers/DashboardController.php:14
 * @route '/dashboard/stats'
 */
        statsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: stats.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DashboardController::stats
 * @see app/Http/Controllers/DashboardController.php:14
 * @route '/dashboard/stats'
 */
        statsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: stats.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    stats.form = statsForm
/**
* @see \App\Http\Controllers\DashboardController::series
 * @see app/Http/Controllers/DashboardController.php:90
 * @route '/dashboard/series'
 */
export const series = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: series.url(options),
    method: 'get',
})

series.definition = {
    methods: ["get","head"],
    url: '/dashboard/series',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::series
 * @see app/Http/Controllers/DashboardController.php:90
 * @route '/dashboard/series'
 */
series.url = (options?: RouteQueryOptions) => {
    return series.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::series
 * @see app/Http/Controllers/DashboardController.php:90
 * @route '/dashboard/series'
 */
series.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: series.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DashboardController::series
 * @see app/Http/Controllers/DashboardController.php:90
 * @route '/dashboard/series'
 */
series.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: series.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DashboardController::series
 * @see app/Http/Controllers/DashboardController.php:90
 * @route '/dashboard/series'
 */
    const seriesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: series.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DashboardController::series
 * @see app/Http/Controllers/DashboardController.php:90
 * @route '/dashboard/series'
 */
        seriesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: series.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DashboardController::series
 * @see app/Http/Controllers/DashboardController.php:90
 * @route '/dashboard/series'
 */
        seriesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: series.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    series.form = seriesForm
const DashboardController = { stats, series }

export default DashboardController