import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\StaticPageController::home
 * @see app/Http/Controllers/StaticPageController.php:70
 * @route '/'
 */
export const home = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

home.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StaticPageController::home
 * @see app/Http/Controllers/StaticPageController.php:70
 * @route '/'
 */
home.url = (options?: RouteQueryOptions) => {
    return home.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StaticPageController::home
 * @see app/Http/Controllers/StaticPageController.php:70
 * @route '/'
 */
home.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StaticPageController::home
 * @see app/Http/Controllers/StaticPageController.php:70
 * @route '/'
 */
home.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: home.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\StaticPageController::home
 * @see app/Http/Controllers/StaticPageController.php:70
 * @route '/'
 */
    const homeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: home.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\StaticPageController::home
 * @see app/Http/Controllers/StaticPageController.php:70
 * @route '/'
 */
        homeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: home.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\StaticPageController::home
 * @see app/Http/Controllers/StaticPageController.php:70
 * @route '/'
 */
        homeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: home.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    home.form = homeForm
/**
* @see \App\Http\Controllers\StaticPageController::about
 * @see app/Http/Controllers/StaticPageController.php:11
 * @route '/about'
 */
export const about = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: about.url(options),
    method: 'get',
})

about.definition = {
    methods: ["get","head"],
    url: '/about',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StaticPageController::about
 * @see app/Http/Controllers/StaticPageController.php:11
 * @route '/about'
 */
about.url = (options?: RouteQueryOptions) => {
    return about.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StaticPageController::about
 * @see app/Http/Controllers/StaticPageController.php:11
 * @route '/about'
 */
about.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: about.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StaticPageController::about
 * @see app/Http/Controllers/StaticPageController.php:11
 * @route '/about'
 */
about.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: about.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\StaticPageController::about
 * @see app/Http/Controllers/StaticPageController.php:11
 * @route '/about'
 */
    const aboutForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: about.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\StaticPageController::about
 * @see app/Http/Controllers/StaticPageController.php:11
 * @route '/about'
 */
        aboutForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: about.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\StaticPageController::about
 * @see app/Http/Controllers/StaticPageController.php:11
 * @route '/about'
 */
        aboutForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: about.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    about.form = aboutForm
/**
* @see \App\Http\Controllers\StaticPageController::contact
 * @see app/Http/Controllers/StaticPageController.php:18
 * @route '/contact'
 */
export const contact = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: contact.url(options),
    method: 'get',
})

contact.definition = {
    methods: ["get","head"],
    url: '/contact',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StaticPageController::contact
 * @see app/Http/Controllers/StaticPageController.php:18
 * @route '/contact'
 */
contact.url = (options?: RouteQueryOptions) => {
    return contact.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StaticPageController::contact
 * @see app/Http/Controllers/StaticPageController.php:18
 * @route '/contact'
 */
contact.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: contact.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StaticPageController::contact
 * @see app/Http/Controllers/StaticPageController.php:18
 * @route '/contact'
 */
contact.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: contact.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\StaticPageController::contact
 * @see app/Http/Controllers/StaticPageController.php:18
 * @route '/contact'
 */
    const contactForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: contact.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\StaticPageController::contact
 * @see app/Http/Controllers/StaticPageController.php:18
 * @route '/contact'
 */
        contactForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: contact.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\StaticPageController::contact
 * @see app/Http/Controllers/StaticPageController.php:18
 * @route '/contact'
 */
        contactForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: contact.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    contact.form = contactForm
/**
* @see \App\Http\Controllers\StaticPageController::services
 * @see app/Http/Controllers/StaticPageController.php:25
 * @route '/services'
 */
export const services = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: services.url(options),
    method: 'get',
})

services.definition = {
    methods: ["get","head"],
    url: '/services',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StaticPageController::services
 * @see app/Http/Controllers/StaticPageController.php:25
 * @route '/services'
 */
services.url = (options?: RouteQueryOptions) => {
    return services.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StaticPageController::services
 * @see app/Http/Controllers/StaticPageController.php:25
 * @route '/services'
 */
services.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: services.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StaticPageController::services
 * @see app/Http/Controllers/StaticPageController.php:25
 * @route '/services'
 */
services.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: services.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\StaticPageController::services
 * @see app/Http/Controllers/StaticPageController.php:25
 * @route '/services'
 */
    const servicesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: services.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\StaticPageController::services
 * @see app/Http/Controllers/StaticPageController.php:25
 * @route '/services'
 */
        servicesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: services.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\StaticPageController::services
 * @see app/Http/Controllers/StaticPageController.php:25
 * @route '/services'
 */
        servicesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: services.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    services.form = servicesForm
/**
* @see \App\Http\Controllers\StaticPageController::terms
 * @see app/Http/Controllers/StaticPageController.php:63
 * @route '/terms'
 */
export const terms = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: terms.url(options),
    method: 'get',
})

terms.definition = {
    methods: ["get","head"],
    url: '/terms',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StaticPageController::terms
 * @see app/Http/Controllers/StaticPageController.php:63
 * @route '/terms'
 */
terms.url = (options?: RouteQueryOptions) => {
    return terms.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StaticPageController::terms
 * @see app/Http/Controllers/StaticPageController.php:63
 * @route '/terms'
 */
terms.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: terms.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StaticPageController::terms
 * @see app/Http/Controllers/StaticPageController.php:63
 * @route '/terms'
 */
terms.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: terms.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\StaticPageController::terms
 * @see app/Http/Controllers/StaticPageController.php:63
 * @route '/terms'
 */
    const termsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: terms.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\StaticPageController::terms
 * @see app/Http/Controllers/StaticPageController.php:63
 * @route '/terms'
 */
        termsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: terms.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\StaticPageController::terms
 * @see app/Http/Controllers/StaticPageController.php:63
 * @route '/terms'
 */
        termsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: terms.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    terms.form = termsForm
/**
* @see \App\Http\Controllers\StaticPageController::api
 * @see app/Http/Controllers/StaticPageController.php:56
 * @route '/api-docs'
 */
export const api = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: api.url(options),
    method: 'get',
})

api.definition = {
    methods: ["get","head"],
    url: '/api-docs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StaticPageController::api
 * @see app/Http/Controllers/StaticPageController.php:56
 * @route '/api-docs'
 */
api.url = (options?: RouteQueryOptions) => {
    return api.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StaticPageController::api
 * @see app/Http/Controllers/StaticPageController.php:56
 * @route '/api-docs'
 */
api.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: api.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StaticPageController::api
 * @see app/Http/Controllers/StaticPageController.php:56
 * @route '/api-docs'
 */
api.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: api.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\StaticPageController::api
 * @see app/Http/Controllers/StaticPageController.php:56
 * @route '/api-docs'
 */
    const apiForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: api.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\StaticPageController::api
 * @see app/Http/Controllers/StaticPageController.php:56
 * @route '/api-docs'
 */
        apiForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: api.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\StaticPageController::api
 * @see app/Http/Controllers/StaticPageController.php:56
 * @route '/api-docs'
 */
        apiForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: api.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    api.form = apiForm
const StaticPageController = { home, about, contact, services, terms, api }

export default StaticPageController