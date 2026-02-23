import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\OrderController::index
 * @see app/Http/Controllers/OrderController.php:15
 * @route '/orders'
 */
const index46d571d7fe903e8a2eecb1a2ccbb23f8 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index46d571d7fe903e8a2eecb1a2ccbb23f8.url(options),
    method: 'get',
})

index46d571d7fe903e8a2eecb1a2ccbb23f8.definition = {
    methods: ["get","head"],
    url: '/orders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OrderController::index
 * @see app/Http/Controllers/OrderController.php:15
 * @route '/orders'
 */
index46d571d7fe903e8a2eecb1a2ccbb23f8.url = (options?: RouteQueryOptions) => {
    return index46d571d7fe903e8a2eecb1a2ccbb23f8.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrderController::index
 * @see app/Http/Controllers/OrderController.php:15
 * @route '/orders'
 */
index46d571d7fe903e8a2eecb1a2ccbb23f8.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index46d571d7fe903e8a2eecb1a2ccbb23f8.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\OrderController::index
 * @see app/Http/Controllers/OrderController.php:15
 * @route '/orders'
 */
index46d571d7fe903e8a2eecb1a2ccbb23f8.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index46d571d7fe903e8a2eecb1a2ccbb23f8.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\OrderController::index
 * @see app/Http/Controllers/OrderController.php:15
 * @route '/orders'
 */
    const index46d571d7fe903e8a2eecb1a2ccbb23f8Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index46d571d7fe903e8a2eecb1a2ccbb23f8.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\OrderController::index
 * @see app/Http/Controllers/OrderController.php:15
 * @route '/orders'
 */
        index46d571d7fe903e8a2eecb1a2ccbb23f8Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index46d571d7fe903e8a2eecb1a2ccbb23f8.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\OrderController::index
 * @see app/Http/Controllers/OrderController.php:15
 * @route '/orders'
 */
        index46d571d7fe903e8a2eecb1a2ccbb23f8Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index46d571d7fe903e8a2eecb1a2ccbb23f8.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index46d571d7fe903e8a2eecb1a2ccbb23f8.form = index46d571d7fe903e8a2eecb1a2ccbb23f8Form
    /**
* @see \App\Http\Controllers\OrderController::index
 * @see app/Http/Controllers/OrderController.php:15
 * @route '/admin/orders'
 */
const indexa6889f2f13247e115fd304176069c9b5 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexa6889f2f13247e115fd304176069c9b5.url(options),
    method: 'get',
})

indexa6889f2f13247e115fd304176069c9b5.definition = {
    methods: ["get","head"],
    url: '/admin/orders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OrderController::index
 * @see app/Http/Controllers/OrderController.php:15
 * @route '/admin/orders'
 */
indexa6889f2f13247e115fd304176069c9b5.url = (options?: RouteQueryOptions) => {
    return indexa6889f2f13247e115fd304176069c9b5.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrderController::index
 * @see app/Http/Controllers/OrderController.php:15
 * @route '/admin/orders'
 */
indexa6889f2f13247e115fd304176069c9b5.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexa6889f2f13247e115fd304176069c9b5.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\OrderController::index
 * @see app/Http/Controllers/OrderController.php:15
 * @route '/admin/orders'
 */
indexa6889f2f13247e115fd304176069c9b5.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexa6889f2f13247e115fd304176069c9b5.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\OrderController::index
 * @see app/Http/Controllers/OrderController.php:15
 * @route '/admin/orders'
 */
    const indexa6889f2f13247e115fd304176069c9b5Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indexa6889f2f13247e115fd304176069c9b5.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\OrderController::index
 * @see app/Http/Controllers/OrderController.php:15
 * @route '/admin/orders'
 */
        indexa6889f2f13247e115fd304176069c9b5Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexa6889f2f13247e115fd304176069c9b5.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\OrderController::index
 * @see app/Http/Controllers/OrderController.php:15
 * @route '/admin/orders'
 */
        indexa6889f2f13247e115fd304176069c9b5Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexa6889f2f13247e115fd304176069c9b5.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    indexa6889f2f13247e115fd304176069c9b5.form = indexa6889f2f13247e115fd304176069c9b5Form

export const index = {
    '/orders': index46d571d7fe903e8a2eecb1a2ccbb23f8,
    '/admin/orders': indexa6889f2f13247e115fd304176069c9b5,
}

/**
* @see \App\Http\Controllers\OrderController::create
 * @see app/Http/Controllers/OrderController.php:212
 * @route '/orders/create'
 */
const createfbd9cd50a33bebda657ed84438529dd7 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createfbd9cd50a33bebda657ed84438529dd7.url(options),
    method: 'get',
})

createfbd9cd50a33bebda657ed84438529dd7.definition = {
    methods: ["get","head"],
    url: '/orders/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OrderController::create
 * @see app/Http/Controllers/OrderController.php:212
 * @route '/orders/create'
 */
createfbd9cd50a33bebda657ed84438529dd7.url = (options?: RouteQueryOptions) => {
    return createfbd9cd50a33bebda657ed84438529dd7.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrderController::create
 * @see app/Http/Controllers/OrderController.php:212
 * @route '/orders/create'
 */
createfbd9cd50a33bebda657ed84438529dd7.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createfbd9cd50a33bebda657ed84438529dd7.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\OrderController::create
 * @see app/Http/Controllers/OrderController.php:212
 * @route '/orders/create'
 */
createfbd9cd50a33bebda657ed84438529dd7.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: createfbd9cd50a33bebda657ed84438529dd7.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\OrderController::create
 * @see app/Http/Controllers/OrderController.php:212
 * @route '/orders/create'
 */
    const createfbd9cd50a33bebda657ed84438529dd7Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: createfbd9cd50a33bebda657ed84438529dd7.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\OrderController::create
 * @see app/Http/Controllers/OrderController.php:212
 * @route '/orders/create'
 */
        createfbd9cd50a33bebda657ed84438529dd7Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: createfbd9cd50a33bebda657ed84438529dd7.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\OrderController::create
 * @see app/Http/Controllers/OrderController.php:212
 * @route '/orders/create'
 */
        createfbd9cd50a33bebda657ed84438529dd7Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: createfbd9cd50a33bebda657ed84438529dd7.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    createfbd9cd50a33bebda657ed84438529dd7.form = createfbd9cd50a33bebda657ed84438529dd7Form
    /**
* @see \App\Http\Controllers\OrderController::create
 * @see app/Http/Controllers/OrderController.php:212
 * @route '/admin/orders/create'
 */
const createe8bbee9cbed5f14f9b8c5c6057764a58 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createe8bbee9cbed5f14f9b8c5c6057764a58.url(options),
    method: 'get',
})

createe8bbee9cbed5f14f9b8c5c6057764a58.definition = {
    methods: ["get","head"],
    url: '/admin/orders/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OrderController::create
 * @see app/Http/Controllers/OrderController.php:212
 * @route '/admin/orders/create'
 */
createe8bbee9cbed5f14f9b8c5c6057764a58.url = (options?: RouteQueryOptions) => {
    return createe8bbee9cbed5f14f9b8c5c6057764a58.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrderController::create
 * @see app/Http/Controllers/OrderController.php:212
 * @route '/admin/orders/create'
 */
createe8bbee9cbed5f14f9b8c5c6057764a58.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createe8bbee9cbed5f14f9b8c5c6057764a58.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\OrderController::create
 * @see app/Http/Controllers/OrderController.php:212
 * @route '/admin/orders/create'
 */
createe8bbee9cbed5f14f9b8c5c6057764a58.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: createe8bbee9cbed5f14f9b8c5c6057764a58.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\OrderController::create
 * @see app/Http/Controllers/OrderController.php:212
 * @route '/admin/orders/create'
 */
    const createe8bbee9cbed5f14f9b8c5c6057764a58Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: createe8bbee9cbed5f14f9b8c5c6057764a58.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\OrderController::create
 * @see app/Http/Controllers/OrderController.php:212
 * @route '/admin/orders/create'
 */
        createe8bbee9cbed5f14f9b8c5c6057764a58Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: createe8bbee9cbed5f14f9b8c5c6057764a58.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\OrderController::create
 * @see app/Http/Controllers/OrderController.php:212
 * @route '/admin/orders/create'
 */
        createe8bbee9cbed5f14f9b8c5c6057764a58Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: createe8bbee9cbed5f14f9b8c5c6057764a58.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    createe8bbee9cbed5f14f9b8c5c6057764a58.form = createe8bbee9cbed5f14f9b8c5c6057764a58Form

export const create = {
    '/orders/create': createfbd9cd50a33bebda657ed84438529dd7,
    '/admin/orders/create': createe8bbee9cbed5f14f9b8c5c6057764a58,
}

/**
* @see \App\Http\Controllers\OrderController::status
 * @see app/Http/Controllers/OrderController.php:90
 * @route '/orders/status'
 */
const status47a000b6e6179941eefc68d5ac83da2f = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status47a000b6e6179941eefc68d5ac83da2f.url(options),
    method: 'get',
})

status47a000b6e6179941eefc68d5ac83da2f.definition = {
    methods: ["get","head"],
    url: '/orders/status',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OrderController::status
 * @see app/Http/Controllers/OrderController.php:90
 * @route '/orders/status'
 */
status47a000b6e6179941eefc68d5ac83da2f.url = (options?: RouteQueryOptions) => {
    return status47a000b6e6179941eefc68d5ac83da2f.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrderController::status
 * @see app/Http/Controllers/OrderController.php:90
 * @route '/orders/status'
 */
status47a000b6e6179941eefc68d5ac83da2f.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status47a000b6e6179941eefc68d5ac83da2f.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\OrderController::status
 * @see app/Http/Controllers/OrderController.php:90
 * @route '/orders/status'
 */
status47a000b6e6179941eefc68d5ac83da2f.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: status47a000b6e6179941eefc68d5ac83da2f.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\OrderController::status
 * @see app/Http/Controllers/OrderController.php:90
 * @route '/orders/status'
 */
    const status47a000b6e6179941eefc68d5ac83da2fForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: status47a000b6e6179941eefc68d5ac83da2f.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\OrderController::status
 * @see app/Http/Controllers/OrderController.php:90
 * @route '/orders/status'
 */
        status47a000b6e6179941eefc68d5ac83da2fForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: status47a000b6e6179941eefc68d5ac83da2f.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\OrderController::status
 * @see app/Http/Controllers/OrderController.php:90
 * @route '/orders/status'
 */
        status47a000b6e6179941eefc68d5ac83da2fForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: status47a000b6e6179941eefc68d5ac83da2f.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    status47a000b6e6179941eefc68d5ac83da2f.form = status47a000b6e6179941eefc68d5ac83da2fForm
    /**
* @see \App\Http\Controllers\OrderController::status
 * @see app/Http/Controllers/OrderController.php:90
 * @route '/admin/orders/status'
 */
const status4beda1b09686d7aae297f3e21417dc9a = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status4beda1b09686d7aae297f3e21417dc9a.url(options),
    method: 'get',
})

status4beda1b09686d7aae297f3e21417dc9a.definition = {
    methods: ["get","head"],
    url: '/admin/orders/status',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OrderController::status
 * @see app/Http/Controllers/OrderController.php:90
 * @route '/admin/orders/status'
 */
status4beda1b09686d7aae297f3e21417dc9a.url = (options?: RouteQueryOptions) => {
    return status4beda1b09686d7aae297f3e21417dc9a.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrderController::status
 * @see app/Http/Controllers/OrderController.php:90
 * @route '/admin/orders/status'
 */
status4beda1b09686d7aae297f3e21417dc9a.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status4beda1b09686d7aae297f3e21417dc9a.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\OrderController::status
 * @see app/Http/Controllers/OrderController.php:90
 * @route '/admin/orders/status'
 */
status4beda1b09686d7aae297f3e21417dc9a.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: status4beda1b09686d7aae297f3e21417dc9a.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\OrderController::status
 * @see app/Http/Controllers/OrderController.php:90
 * @route '/admin/orders/status'
 */
    const status4beda1b09686d7aae297f3e21417dc9aForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: status4beda1b09686d7aae297f3e21417dc9a.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\OrderController::status
 * @see app/Http/Controllers/OrderController.php:90
 * @route '/admin/orders/status'
 */
        status4beda1b09686d7aae297f3e21417dc9aForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: status4beda1b09686d7aae297f3e21417dc9a.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\OrderController::status
 * @see app/Http/Controllers/OrderController.php:90
 * @route '/admin/orders/status'
 */
        status4beda1b09686d7aae297f3e21417dc9aForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: status4beda1b09686d7aae297f3e21417dc9a.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    status4beda1b09686d7aae297f3e21417dc9a.form = status4beda1b09686d7aae297f3e21417dc9aForm

export const status = {
    '/orders/status': status47a000b6e6179941eefc68d5ac83da2f,
    '/admin/orders/status': status4beda1b09686d7aae297f3e21417dc9a,
}

/**
* @see \App\Http\Controllers\OrderController::store
 * @see app/Http/Controllers/OrderController.php:255
 * @route '/orders'
 */
const store46d571d7fe903e8a2eecb1a2ccbb23f8 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store46d571d7fe903e8a2eecb1a2ccbb23f8.url(options),
    method: 'post',
})

store46d571d7fe903e8a2eecb1a2ccbb23f8.definition = {
    methods: ["post"],
    url: '/orders',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\OrderController::store
 * @see app/Http/Controllers/OrderController.php:255
 * @route '/orders'
 */
store46d571d7fe903e8a2eecb1a2ccbb23f8.url = (options?: RouteQueryOptions) => {
    return store46d571d7fe903e8a2eecb1a2ccbb23f8.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrderController::store
 * @see app/Http/Controllers/OrderController.php:255
 * @route '/orders'
 */
store46d571d7fe903e8a2eecb1a2ccbb23f8.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store46d571d7fe903e8a2eecb1a2ccbb23f8.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\OrderController::store
 * @see app/Http/Controllers/OrderController.php:255
 * @route '/orders'
 */
    const store46d571d7fe903e8a2eecb1a2ccbb23f8Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store46d571d7fe903e8a2eecb1a2ccbb23f8.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\OrderController::store
 * @see app/Http/Controllers/OrderController.php:255
 * @route '/orders'
 */
        store46d571d7fe903e8a2eecb1a2ccbb23f8Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store46d571d7fe903e8a2eecb1a2ccbb23f8.url(options),
            method: 'post',
        })
    
    store46d571d7fe903e8a2eecb1a2ccbb23f8.form = store46d571d7fe903e8a2eecb1a2ccbb23f8Form
    /**
* @see \App\Http\Controllers\OrderController::store
 * @see app/Http/Controllers/OrderController.php:255
 * @route '/admin/orders'
 */
const storea6889f2f13247e115fd304176069c9b5 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storea6889f2f13247e115fd304176069c9b5.url(options),
    method: 'post',
})

storea6889f2f13247e115fd304176069c9b5.definition = {
    methods: ["post"],
    url: '/admin/orders',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\OrderController::store
 * @see app/Http/Controllers/OrderController.php:255
 * @route '/admin/orders'
 */
storea6889f2f13247e115fd304176069c9b5.url = (options?: RouteQueryOptions) => {
    return storea6889f2f13247e115fd304176069c9b5.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrderController::store
 * @see app/Http/Controllers/OrderController.php:255
 * @route '/admin/orders'
 */
storea6889f2f13247e115fd304176069c9b5.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storea6889f2f13247e115fd304176069c9b5.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\OrderController::store
 * @see app/Http/Controllers/OrderController.php:255
 * @route '/admin/orders'
 */
    const storea6889f2f13247e115fd304176069c9b5Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storea6889f2f13247e115fd304176069c9b5.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\OrderController::store
 * @see app/Http/Controllers/OrderController.php:255
 * @route '/admin/orders'
 */
        storea6889f2f13247e115fd304176069c9b5Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storea6889f2f13247e115fd304176069c9b5.url(options),
            method: 'post',
        })
    
    storea6889f2f13247e115fd304176069c9b5.form = storea6889f2f13247e115fd304176069c9b5Form

export const store = {
    '/orders': store46d571d7fe903e8a2eecb1a2ccbb23f8,
    '/admin/orders': storea6889f2f13247e115fd304176069c9b5,
}

const OrderController = { index, create, status, store }

export default OrderController