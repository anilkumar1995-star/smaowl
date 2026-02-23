import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\OrderController::index46d571
 * @see app/Http/Controllers/OrderController.php:15
 * @route '/orders'
 */
export const index46d571 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index46d571.url(options),
    method: 'get',
})

index46d571.definition = {
    methods: ["get","head"],
    url: '/orders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OrderController::index46d571
 * @see app/Http/Controllers/OrderController.php:15
 * @route '/orders'
 */
index46d571.url = (options?: RouteQueryOptions) => {
    return index46d571.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrderController::index46d571
 * @see app/Http/Controllers/OrderController.php:15
 * @route '/orders'
 */
index46d571.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index46d571.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\OrderController::index46d571
 * @see app/Http/Controllers/OrderController.php:15
 * @route '/orders'
 */
index46d571.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index46d571.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\OrderController::index46d571
 * @see app/Http/Controllers/OrderController.php:15
 * @route '/orders'
 */
    const index46d571Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index46d571.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\OrderController::index46d571
 * @see app/Http/Controllers/OrderController.php:15
 * @route '/orders'
 */
        index46d571Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index46d571.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\OrderController::index46d571
 * @see app/Http/Controllers/OrderController.php:15
 * @route '/orders'
 */
        index46d571Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index46d571.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index46d571.form = index46d571Form
/**
* @see \App\Http\Controllers\OrderController::indexA6889f
 * @see app/Http/Controllers/OrderController.php:15
 * @route '/admin/orders'
 */
export const indexA6889f = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexA6889f.url(options),
    method: 'get',
})

indexA6889f.definition = {
    methods: ["get","head"],
    url: '/admin/orders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OrderController::indexA6889f
 * @see app/Http/Controllers/OrderController.php:15
 * @route '/admin/orders'
 */
indexA6889f.url = (options?: RouteQueryOptions) => {
    return indexA6889f.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrderController::indexA6889f
 * @see app/Http/Controllers/OrderController.php:15
 * @route '/admin/orders'
 */
indexA6889f.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexA6889f.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\OrderController::indexA6889f
 * @see app/Http/Controllers/OrderController.php:15
 * @route '/admin/orders'
 */
indexA6889f.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexA6889f.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\OrderController::indexA6889f
 * @see app/Http/Controllers/OrderController.php:15
 * @route '/admin/orders'
 */
    const indexA6889fForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indexA6889f.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\OrderController::indexA6889f
 * @see app/Http/Controllers/OrderController.php:15
 * @route '/admin/orders'
 */
        indexA6889fForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexA6889f.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\OrderController::indexA6889f
 * @see app/Http/Controllers/OrderController.php:15
 * @route '/admin/orders'
 */
        indexA6889fForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexA6889f.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    indexA6889f.form = indexA6889fForm
/**
* @see \App\Http\Controllers\OrderController::createFbd9cd
 * @see app/Http/Controllers/OrderController.php:212
 * @route '/orders/create'
 */
export const createFbd9cd = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createFbd9cd.url(options),
    method: 'get',
})

createFbd9cd.definition = {
    methods: ["get","head"],
    url: '/orders/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OrderController::createFbd9cd
 * @see app/Http/Controllers/OrderController.php:212
 * @route '/orders/create'
 */
createFbd9cd.url = (options?: RouteQueryOptions) => {
    return createFbd9cd.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrderController::createFbd9cd
 * @see app/Http/Controllers/OrderController.php:212
 * @route '/orders/create'
 */
createFbd9cd.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createFbd9cd.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\OrderController::createFbd9cd
 * @see app/Http/Controllers/OrderController.php:212
 * @route '/orders/create'
 */
createFbd9cd.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: createFbd9cd.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\OrderController::createFbd9cd
 * @see app/Http/Controllers/OrderController.php:212
 * @route '/orders/create'
 */
    const createFbd9cdForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: createFbd9cd.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\OrderController::createFbd9cd
 * @see app/Http/Controllers/OrderController.php:212
 * @route '/orders/create'
 */
        createFbd9cdForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: createFbd9cd.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\OrderController::createFbd9cd
 * @see app/Http/Controllers/OrderController.php:212
 * @route '/orders/create'
 */
        createFbd9cdForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: createFbd9cd.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    createFbd9cd.form = createFbd9cdForm
/**
* @see \App\Http\Controllers\OrderController::createE8bbee
 * @see app/Http/Controllers/OrderController.php:212
 * @route '/admin/orders/create'
 */
export const createE8bbee = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createE8bbee.url(options),
    method: 'get',
})

createE8bbee.definition = {
    methods: ["get","head"],
    url: '/admin/orders/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OrderController::createE8bbee
 * @see app/Http/Controllers/OrderController.php:212
 * @route '/admin/orders/create'
 */
createE8bbee.url = (options?: RouteQueryOptions) => {
    return createE8bbee.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrderController::createE8bbee
 * @see app/Http/Controllers/OrderController.php:212
 * @route '/admin/orders/create'
 */
createE8bbee.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createE8bbee.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\OrderController::createE8bbee
 * @see app/Http/Controllers/OrderController.php:212
 * @route '/admin/orders/create'
 */
createE8bbee.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: createE8bbee.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\OrderController::createE8bbee
 * @see app/Http/Controllers/OrderController.php:212
 * @route '/admin/orders/create'
 */
    const createE8bbeeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: createE8bbee.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\OrderController::createE8bbee
 * @see app/Http/Controllers/OrderController.php:212
 * @route '/admin/orders/create'
 */
        createE8bbeeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: createE8bbee.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\OrderController::createE8bbee
 * @see app/Http/Controllers/OrderController.php:212
 * @route '/admin/orders/create'
 */
        createE8bbeeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: createE8bbee.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    createE8bbee.form = createE8bbeeForm
/**
* @see \App\Http\Controllers\OrderController::status47a000
 * @see app/Http/Controllers/OrderController.php:90
 * @route '/orders/status'
 */
export const status47a000 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status47a000.url(options),
    method: 'get',
})

status47a000.definition = {
    methods: ["get","head"],
    url: '/orders/status',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OrderController::status47a000
 * @see app/Http/Controllers/OrderController.php:90
 * @route '/orders/status'
 */
status47a000.url = (options?: RouteQueryOptions) => {
    return status47a000.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrderController::status47a000
 * @see app/Http/Controllers/OrderController.php:90
 * @route '/orders/status'
 */
status47a000.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status47a000.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\OrderController::status47a000
 * @see app/Http/Controllers/OrderController.php:90
 * @route '/orders/status'
 */
status47a000.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: status47a000.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\OrderController::status47a000
 * @see app/Http/Controllers/OrderController.php:90
 * @route '/orders/status'
 */
    const status47a000Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: status47a000.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\OrderController::status47a000
 * @see app/Http/Controllers/OrderController.php:90
 * @route '/orders/status'
 */
        status47a000Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: status47a000.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\OrderController::status47a000
 * @see app/Http/Controllers/OrderController.php:90
 * @route '/orders/status'
 */
        status47a000Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: status47a000.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    status47a000.form = status47a000Form
/**
* @see \App\Http\Controllers\OrderController::status4beda1
 * @see app/Http/Controllers/OrderController.php:90
 * @route '/admin/orders/status'
 */
export const status4beda1 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status4beda1.url(options),
    method: 'get',
})

status4beda1.definition = {
    methods: ["get","head"],
    url: '/admin/orders/status',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OrderController::status4beda1
 * @see app/Http/Controllers/OrderController.php:90
 * @route '/admin/orders/status'
 */
status4beda1.url = (options?: RouteQueryOptions) => {
    return status4beda1.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrderController::status4beda1
 * @see app/Http/Controllers/OrderController.php:90
 * @route '/admin/orders/status'
 */
status4beda1.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status4beda1.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\OrderController::status4beda1
 * @see app/Http/Controllers/OrderController.php:90
 * @route '/admin/orders/status'
 */
status4beda1.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: status4beda1.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\OrderController::status4beda1
 * @see app/Http/Controllers/OrderController.php:90
 * @route '/admin/orders/status'
 */
    const status4beda1Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: status4beda1.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\OrderController::status4beda1
 * @see app/Http/Controllers/OrderController.php:90
 * @route '/admin/orders/status'
 */
        status4beda1Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: status4beda1.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\OrderController::status4beda1
 * @see app/Http/Controllers/OrderController.php:90
 * @route '/admin/orders/status'
 */
        status4beda1Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: status4beda1.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    status4beda1.form = status4beda1Form
/**
* @see \App\Http\Controllers\OrderController::store46d571
 * @see app/Http/Controllers/OrderController.php:255
 * @route '/orders'
 */
export const store46d571 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store46d571.url(options),
    method: 'post',
})

store46d571.definition = {
    methods: ["post"],
    url: '/orders',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\OrderController::store46d571
 * @see app/Http/Controllers/OrderController.php:255
 * @route '/orders'
 */
store46d571.url = (options?: RouteQueryOptions) => {
    return store46d571.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrderController::store46d571
 * @see app/Http/Controllers/OrderController.php:255
 * @route '/orders'
 */
store46d571.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store46d571.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\OrderController::store46d571
 * @see app/Http/Controllers/OrderController.php:255
 * @route '/orders'
 */
    const store46d571Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store46d571.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\OrderController::store46d571
 * @see app/Http/Controllers/OrderController.php:255
 * @route '/orders'
 */
        store46d571Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store46d571.url(options),
            method: 'post',
        })
    
    store46d571.form = store46d571Form
/**
* @see \App\Http\Controllers\OrderController::storeA6889f
 * @see app/Http/Controllers/OrderController.php:255
 * @route '/admin/orders'
 */
export const storeA6889f = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeA6889f.url(options),
    method: 'post',
})

storeA6889f.definition = {
    methods: ["post"],
    url: '/admin/orders',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\OrderController::storeA6889f
 * @see app/Http/Controllers/OrderController.php:255
 * @route '/admin/orders'
 */
storeA6889f.url = (options?: RouteQueryOptions) => {
    return storeA6889f.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrderController::storeA6889f
 * @see app/Http/Controllers/OrderController.php:255
 * @route '/admin/orders'
 */
storeA6889f.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeA6889f.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\OrderController::storeA6889f
 * @see app/Http/Controllers/OrderController.php:255
 * @route '/admin/orders'
 */
    const storeA6889fForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeA6889f.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\OrderController::storeA6889f
 * @see app/Http/Controllers/OrderController.php:255
 * @route '/admin/orders'
 */
        storeA6889fForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeA6889f.url(options),
            method: 'post',
        })
    
    storeA6889f.form = storeA6889fForm
const orders = {
    index: Object.assign(index46d571, indexA6889f),
    create: Object.assign(createFbd9cd, createE8bbee),
    status: Object.assign(status47a000, status4beda1),
    store: Object.assign(store46d571, storeA6889f),
}

export default orders