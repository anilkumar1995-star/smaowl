import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\StaticPageController::docs
 * @see app/Http/Controllers/StaticPageController.php:56
 * @route '/api-docs'
 */
export const docs = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: docs.url(options),
    method: 'get',
})

docs.definition = {
    methods: ["get","head"],
    url: '/api-docs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StaticPageController::docs
 * @see app/Http/Controllers/StaticPageController.php:56
 * @route '/api-docs'
 */
docs.url = (options?: RouteQueryOptions) => {
    return docs.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StaticPageController::docs
 * @see app/Http/Controllers/StaticPageController.php:56
 * @route '/api-docs'
 */
docs.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: docs.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StaticPageController::docs
 * @see app/Http/Controllers/StaticPageController.php:56
 * @route '/api-docs'
 */
docs.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: docs.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\StaticPageController::docs
 * @see app/Http/Controllers/StaticPageController.php:56
 * @route '/api-docs'
 */
    const docsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: docs.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\StaticPageController::docs
 * @see app/Http/Controllers/StaticPageController.php:56
 * @route '/api-docs'
 */
        docsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: docs.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\StaticPageController::docs
 * @see app/Http/Controllers/StaticPageController.php:56
 * @route '/api-docs'
 */
        docsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: docs.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    docs.form = docsForm
const api = {
    docs: Object.assign(docs, docs),
}

export default api