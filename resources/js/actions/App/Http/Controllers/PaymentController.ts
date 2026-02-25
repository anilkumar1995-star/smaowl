import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PaymentController::manualForm
 * @see app/Http/Controllers/PaymentController.php:202
 * @route '/payments/manual'
 */
export const manualForm = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: manualForm.url(options),
    method: 'get',
})

manualForm.definition = {
    methods: ["get","head"],
    url: '/payments/manual',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PaymentController::manualForm
 * @see app/Http/Controllers/PaymentController.php:202
 * @route '/payments/manual'
 */
manualForm.url = (options?: RouteQueryOptions) => {
    return manualForm.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::manualForm
 * @see app/Http/Controllers/PaymentController.php:202
 * @route '/payments/manual'
 */
manualForm.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: manualForm.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PaymentController::manualForm
 * @see app/Http/Controllers/PaymentController.php:202
 * @route '/payments/manual'
 */
manualForm.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: manualForm.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PaymentController::manualForm
 * @see app/Http/Controllers/PaymentController.php:202
 * @route '/payments/manual'
 */
    const manualFormForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: manualForm.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PaymentController::manualForm
 * @see app/Http/Controllers/PaymentController.php:202
 * @route '/payments/manual'
 */
        manualFormForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: manualForm.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PaymentController::manualForm
 * @see app/Http/Controllers/PaymentController.php:202
 * @route '/payments/manual'
 */
        manualFormForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: manualForm.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    manualForm.form = manualFormForm
/**
* @see \App\Http\Controllers\PaymentController::manualStore
 * @see app/Http/Controllers/PaymentController.php:210
 * @route '/payments/manual'
 */
export const manualStore = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: manualStore.url(options),
    method: 'post',
})

manualStore.definition = {
    methods: ["post"],
    url: '/payments/manual',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PaymentController::manualStore
 * @see app/Http/Controllers/PaymentController.php:210
 * @route '/payments/manual'
 */
manualStore.url = (options?: RouteQueryOptions) => {
    return manualStore.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::manualStore
 * @see app/Http/Controllers/PaymentController.php:210
 * @route '/payments/manual'
 */
manualStore.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: manualStore.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PaymentController::manualStore
 * @see app/Http/Controllers/PaymentController.php:210
 * @route '/payments/manual'
 */
    const manualStoreForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: manualStore.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PaymentController::manualStore
 * @see app/Http/Controllers/PaymentController.php:210
 * @route '/payments/manual'
 */
        manualStoreForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: manualStore.url(options),
            method: 'post',
        })
    
    manualStore.form = manualStoreForm
/**
* @see \App\Http\Controllers\PaymentController::create
 * @see app/Http/Controllers/PaymentController.php:32
 * @route '/payments/add-funds'
 */
const create5ade6c0435774c21db8b63aa5fce91b0 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create5ade6c0435774c21db8b63aa5fce91b0.url(options),
    method: 'get',
})

create5ade6c0435774c21db8b63aa5fce91b0.definition = {
    methods: ["get","head"],
    url: '/payments/add-funds',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PaymentController::create
 * @see app/Http/Controllers/PaymentController.php:32
 * @route '/payments/add-funds'
 */
create5ade6c0435774c21db8b63aa5fce91b0.url = (options?: RouteQueryOptions) => {
    return create5ade6c0435774c21db8b63aa5fce91b0.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::create
 * @see app/Http/Controllers/PaymentController.php:32
 * @route '/payments/add-funds'
 */
create5ade6c0435774c21db8b63aa5fce91b0.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create5ade6c0435774c21db8b63aa5fce91b0.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PaymentController::create
 * @see app/Http/Controllers/PaymentController.php:32
 * @route '/payments/add-funds'
 */
create5ade6c0435774c21db8b63aa5fce91b0.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create5ade6c0435774c21db8b63aa5fce91b0.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PaymentController::create
 * @see app/Http/Controllers/PaymentController.php:32
 * @route '/payments/add-funds'
 */
    const create5ade6c0435774c21db8b63aa5fce91b0Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create5ade6c0435774c21db8b63aa5fce91b0.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PaymentController::create
 * @see app/Http/Controllers/PaymentController.php:32
 * @route '/payments/add-funds'
 */
        create5ade6c0435774c21db8b63aa5fce91b0Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create5ade6c0435774c21db8b63aa5fce91b0.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PaymentController::create
 * @see app/Http/Controllers/PaymentController.php:32
 * @route '/payments/add-funds'
 */
        create5ade6c0435774c21db8b63aa5fce91b0Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create5ade6c0435774c21db8b63aa5fce91b0.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create5ade6c0435774c21db8b63aa5fce91b0.form = create5ade6c0435774c21db8b63aa5fce91b0Form
    /**
* @see \App\Http\Controllers\PaymentController::create
 * @see app/Http/Controllers/PaymentController.php:32
 * @route '/admin/payments/add-funds'
 */
const create1b20112b7b94e763598a3f86ebe3b0d2 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create1b20112b7b94e763598a3f86ebe3b0d2.url(options),
    method: 'get',
})

create1b20112b7b94e763598a3f86ebe3b0d2.definition = {
    methods: ["get","head"],
    url: '/admin/payments/add-funds',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PaymentController::create
 * @see app/Http/Controllers/PaymentController.php:32
 * @route '/admin/payments/add-funds'
 */
create1b20112b7b94e763598a3f86ebe3b0d2.url = (options?: RouteQueryOptions) => {
    return create1b20112b7b94e763598a3f86ebe3b0d2.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::create
 * @see app/Http/Controllers/PaymentController.php:32
 * @route '/admin/payments/add-funds'
 */
create1b20112b7b94e763598a3f86ebe3b0d2.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create1b20112b7b94e763598a3f86ebe3b0d2.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PaymentController::create
 * @see app/Http/Controllers/PaymentController.php:32
 * @route '/admin/payments/add-funds'
 */
create1b20112b7b94e763598a3f86ebe3b0d2.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create1b20112b7b94e763598a3f86ebe3b0d2.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PaymentController::create
 * @see app/Http/Controllers/PaymentController.php:32
 * @route '/admin/payments/add-funds'
 */
    const create1b20112b7b94e763598a3f86ebe3b0d2Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create1b20112b7b94e763598a3f86ebe3b0d2.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PaymentController::create
 * @see app/Http/Controllers/PaymentController.php:32
 * @route '/admin/payments/add-funds'
 */
        create1b20112b7b94e763598a3f86ebe3b0d2Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create1b20112b7b94e763598a3f86ebe3b0d2.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PaymentController::create
 * @see app/Http/Controllers/PaymentController.php:32
 * @route '/admin/payments/add-funds'
 */
        create1b20112b7b94e763598a3f86ebe3b0d2Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create1b20112b7b94e763598a3f86ebe3b0d2.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create1b20112b7b94e763598a3f86ebe3b0d2.form = create1b20112b7b94e763598a3f86ebe3b0d2Form

export const create = {
    '/payments/add-funds': create5ade6c0435774c21db8b63aa5fce91b0,
    '/admin/payments/add-funds': create1b20112b7b94e763598a3f86ebe3b0d2,
}

/**
* @see \App\Http\Controllers\PaymentController::createOrder
 * @see app/Http/Controllers/PaymentController.php:42
 * @route '/payments/order'
 */
const createOrder4ba3ddc2a3d8865645db4cc0716f5205 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createOrder4ba3ddc2a3d8865645db4cc0716f5205.url(options),
    method: 'post',
})

createOrder4ba3ddc2a3d8865645db4cc0716f5205.definition = {
    methods: ["post"],
    url: '/payments/order',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PaymentController::createOrder
 * @see app/Http/Controllers/PaymentController.php:42
 * @route '/payments/order'
 */
createOrder4ba3ddc2a3d8865645db4cc0716f5205.url = (options?: RouteQueryOptions) => {
    return createOrder4ba3ddc2a3d8865645db4cc0716f5205.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::createOrder
 * @see app/Http/Controllers/PaymentController.php:42
 * @route '/payments/order'
 */
createOrder4ba3ddc2a3d8865645db4cc0716f5205.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createOrder4ba3ddc2a3d8865645db4cc0716f5205.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PaymentController::createOrder
 * @see app/Http/Controllers/PaymentController.php:42
 * @route '/payments/order'
 */
    const createOrder4ba3ddc2a3d8865645db4cc0716f5205Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: createOrder4ba3ddc2a3d8865645db4cc0716f5205.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PaymentController::createOrder
 * @see app/Http/Controllers/PaymentController.php:42
 * @route '/payments/order'
 */
        createOrder4ba3ddc2a3d8865645db4cc0716f5205Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: createOrder4ba3ddc2a3d8865645db4cc0716f5205.url(options),
            method: 'post',
        })
    
    createOrder4ba3ddc2a3d8865645db4cc0716f5205.form = createOrder4ba3ddc2a3d8865645db4cc0716f5205Form
    /**
* @see \App\Http\Controllers\PaymentController::createOrder
 * @see app/Http/Controllers/PaymentController.php:42
 * @route '/admin/payments/order'
 */
const createOrder2f66c5e39fdb96a5efa127b6c17419e2 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createOrder2f66c5e39fdb96a5efa127b6c17419e2.url(options),
    method: 'post',
})

createOrder2f66c5e39fdb96a5efa127b6c17419e2.definition = {
    methods: ["post"],
    url: '/admin/payments/order',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PaymentController::createOrder
 * @see app/Http/Controllers/PaymentController.php:42
 * @route '/admin/payments/order'
 */
createOrder2f66c5e39fdb96a5efa127b6c17419e2.url = (options?: RouteQueryOptions) => {
    return createOrder2f66c5e39fdb96a5efa127b6c17419e2.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::createOrder
 * @see app/Http/Controllers/PaymentController.php:42
 * @route '/admin/payments/order'
 */
createOrder2f66c5e39fdb96a5efa127b6c17419e2.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createOrder2f66c5e39fdb96a5efa127b6c17419e2.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PaymentController::createOrder
 * @see app/Http/Controllers/PaymentController.php:42
 * @route '/admin/payments/order'
 */
    const createOrder2f66c5e39fdb96a5efa127b6c17419e2Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: createOrder2f66c5e39fdb96a5efa127b6c17419e2.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PaymentController::createOrder
 * @see app/Http/Controllers/PaymentController.php:42
 * @route '/admin/payments/order'
 */
        createOrder2f66c5e39fdb96a5efa127b6c17419e2Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: createOrder2f66c5e39fdb96a5efa127b6c17419e2.url(options),
            method: 'post',
        })
    
    createOrder2f66c5e39fdb96a5efa127b6c17419e2.form = createOrder2f66c5e39fdb96a5efa127b6c17419e2Form

export const createOrder = {
    '/payments/order': createOrder4ba3ddc2a3d8865645db4cc0716f5205,
    '/admin/payments/order': createOrder2f66c5e39fdb96a5efa127b6c17419e2,
}

/**
* @see \App\Http\Controllers\PaymentController::success
 * @see app/Http/Controllers/PaymentController.php:93
 * @route '/payments/success'
 */
const success7e4dc5cc2e0f85f6836a4b092d6b4da2 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: success7e4dc5cc2e0f85f6836a4b092d6b4da2.url(options),
    method: 'post',
})

success7e4dc5cc2e0f85f6836a4b092d6b4da2.definition = {
    methods: ["post"],
    url: '/payments/success',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PaymentController::success
 * @see app/Http/Controllers/PaymentController.php:93
 * @route '/payments/success'
 */
success7e4dc5cc2e0f85f6836a4b092d6b4da2.url = (options?: RouteQueryOptions) => {
    return success7e4dc5cc2e0f85f6836a4b092d6b4da2.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::success
 * @see app/Http/Controllers/PaymentController.php:93
 * @route '/payments/success'
 */
success7e4dc5cc2e0f85f6836a4b092d6b4da2.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: success7e4dc5cc2e0f85f6836a4b092d6b4da2.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PaymentController::success
 * @see app/Http/Controllers/PaymentController.php:93
 * @route '/payments/success'
 */
    const success7e4dc5cc2e0f85f6836a4b092d6b4da2Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: success7e4dc5cc2e0f85f6836a4b092d6b4da2.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PaymentController::success
 * @see app/Http/Controllers/PaymentController.php:93
 * @route '/payments/success'
 */
        success7e4dc5cc2e0f85f6836a4b092d6b4da2Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: success7e4dc5cc2e0f85f6836a4b092d6b4da2.url(options),
            method: 'post',
        })
    
    success7e4dc5cc2e0f85f6836a4b092d6b4da2.form = success7e4dc5cc2e0f85f6836a4b092d6b4da2Form
    /**
* @see \App\Http\Controllers\PaymentController::success
 * @see app/Http/Controllers/PaymentController.php:93
 * @route '/admin/payments/success'
 */
const successfd6392979a0aaf3245122867129e9587 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: successfd6392979a0aaf3245122867129e9587.url(options),
    method: 'post',
})

successfd6392979a0aaf3245122867129e9587.definition = {
    methods: ["post"],
    url: '/admin/payments/success',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PaymentController::success
 * @see app/Http/Controllers/PaymentController.php:93
 * @route '/admin/payments/success'
 */
successfd6392979a0aaf3245122867129e9587.url = (options?: RouteQueryOptions) => {
    return successfd6392979a0aaf3245122867129e9587.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::success
 * @see app/Http/Controllers/PaymentController.php:93
 * @route '/admin/payments/success'
 */
successfd6392979a0aaf3245122867129e9587.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: successfd6392979a0aaf3245122867129e9587.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PaymentController::success
 * @see app/Http/Controllers/PaymentController.php:93
 * @route '/admin/payments/success'
 */
    const successfd6392979a0aaf3245122867129e9587Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: successfd6392979a0aaf3245122867129e9587.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PaymentController::success
 * @see app/Http/Controllers/PaymentController.php:93
 * @route '/admin/payments/success'
 */
        successfd6392979a0aaf3245122867129e9587Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: successfd6392979a0aaf3245122867129e9587.url(options),
            method: 'post',
        })
    
    successfd6392979a0aaf3245122867129e9587.form = successfd6392979a0aaf3245122867129e9587Form

export const success = {
    '/payments/success': success7e4dc5cc2e0f85f6836a4b092d6b4da2,
    '/admin/payments/success': successfd6392979a0aaf3245122867129e9587,
}

/**
* @see \App\Http\Controllers\PaymentController::failure
 * @see app/Http/Controllers/PaymentController.php:168
 * @route '/payments/failure'
 */
const failure96302baf54e70a5436fc6fbb612c4a2b = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: failure96302baf54e70a5436fc6fbb612c4a2b.url(options),
    method: 'post',
})

failure96302baf54e70a5436fc6fbb612c4a2b.definition = {
    methods: ["post"],
    url: '/payments/failure',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PaymentController::failure
 * @see app/Http/Controllers/PaymentController.php:168
 * @route '/payments/failure'
 */
failure96302baf54e70a5436fc6fbb612c4a2b.url = (options?: RouteQueryOptions) => {
    return failure96302baf54e70a5436fc6fbb612c4a2b.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::failure
 * @see app/Http/Controllers/PaymentController.php:168
 * @route '/payments/failure'
 */
failure96302baf54e70a5436fc6fbb612c4a2b.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: failure96302baf54e70a5436fc6fbb612c4a2b.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PaymentController::failure
 * @see app/Http/Controllers/PaymentController.php:168
 * @route '/payments/failure'
 */
    const failure96302baf54e70a5436fc6fbb612c4a2bForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: failure96302baf54e70a5436fc6fbb612c4a2b.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PaymentController::failure
 * @see app/Http/Controllers/PaymentController.php:168
 * @route '/payments/failure'
 */
        failure96302baf54e70a5436fc6fbb612c4a2bForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: failure96302baf54e70a5436fc6fbb612c4a2b.url(options),
            method: 'post',
        })
    
    failure96302baf54e70a5436fc6fbb612c4a2b.form = failure96302baf54e70a5436fc6fbb612c4a2bForm
    /**
* @see \App\Http\Controllers\PaymentController::failure
 * @see app/Http/Controllers/PaymentController.php:168
 * @route '/admin/payments/failure'
 */
const failuree53f38562f92aef699b2be4fbe59c16b = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: failuree53f38562f92aef699b2be4fbe59c16b.url(options),
    method: 'post',
})

failuree53f38562f92aef699b2be4fbe59c16b.definition = {
    methods: ["post"],
    url: '/admin/payments/failure',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PaymentController::failure
 * @see app/Http/Controllers/PaymentController.php:168
 * @route '/admin/payments/failure'
 */
failuree53f38562f92aef699b2be4fbe59c16b.url = (options?: RouteQueryOptions) => {
    return failuree53f38562f92aef699b2be4fbe59c16b.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::failure
 * @see app/Http/Controllers/PaymentController.php:168
 * @route '/admin/payments/failure'
 */
failuree53f38562f92aef699b2be4fbe59c16b.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: failuree53f38562f92aef699b2be4fbe59c16b.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PaymentController::failure
 * @see app/Http/Controllers/PaymentController.php:168
 * @route '/admin/payments/failure'
 */
    const failuree53f38562f92aef699b2be4fbe59c16bForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: failuree53f38562f92aef699b2be4fbe59c16b.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PaymentController::failure
 * @see app/Http/Controllers/PaymentController.php:168
 * @route '/admin/payments/failure'
 */
        failuree53f38562f92aef699b2be4fbe59c16bForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: failuree53f38562f92aef699b2be4fbe59c16b.url(options),
            method: 'post',
        })
    
    failuree53f38562f92aef699b2be4fbe59c16b.form = failuree53f38562f92aef699b2be4fbe59c16bForm

export const failure = {
    '/payments/failure': failure96302baf54e70a5436fc6fbb612c4a2b,
    '/admin/payments/failure': failuree53f38562f92aef699b2be4fbe59c16b,
}

/**
* @see \App\Http\Controllers\PaymentController::history
 * @see app/Http/Controllers/PaymentController.php:297
 * @route '/payments/history'
 */
const history170a1c1f55dea84b0476ca03130eedef = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history170a1c1f55dea84b0476ca03130eedef.url(options),
    method: 'get',
})

history170a1c1f55dea84b0476ca03130eedef.definition = {
    methods: ["get","head"],
    url: '/payments/history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PaymentController::history
 * @see app/Http/Controllers/PaymentController.php:297
 * @route '/payments/history'
 */
history170a1c1f55dea84b0476ca03130eedef.url = (options?: RouteQueryOptions) => {
    return history170a1c1f55dea84b0476ca03130eedef.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::history
 * @see app/Http/Controllers/PaymentController.php:297
 * @route '/payments/history'
 */
history170a1c1f55dea84b0476ca03130eedef.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history170a1c1f55dea84b0476ca03130eedef.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PaymentController::history
 * @see app/Http/Controllers/PaymentController.php:297
 * @route '/payments/history'
 */
history170a1c1f55dea84b0476ca03130eedef.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: history170a1c1f55dea84b0476ca03130eedef.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PaymentController::history
 * @see app/Http/Controllers/PaymentController.php:297
 * @route '/payments/history'
 */
    const history170a1c1f55dea84b0476ca03130eedefForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: history170a1c1f55dea84b0476ca03130eedef.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PaymentController::history
 * @see app/Http/Controllers/PaymentController.php:297
 * @route '/payments/history'
 */
        history170a1c1f55dea84b0476ca03130eedefForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: history170a1c1f55dea84b0476ca03130eedef.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PaymentController::history
 * @see app/Http/Controllers/PaymentController.php:297
 * @route '/payments/history'
 */
        history170a1c1f55dea84b0476ca03130eedefForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: history170a1c1f55dea84b0476ca03130eedef.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    history170a1c1f55dea84b0476ca03130eedef.form = history170a1c1f55dea84b0476ca03130eedefForm
    /**
* @see \App\Http\Controllers\PaymentController::history
 * @see app/Http/Controllers/PaymentController.php:297
 * @route '/admin/payments/history'
 */
const historya8981b756a32929fe0be20b83856aeb5 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: historya8981b756a32929fe0be20b83856aeb5.url(options),
    method: 'get',
})

historya8981b756a32929fe0be20b83856aeb5.definition = {
    methods: ["get","head"],
    url: '/admin/payments/history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PaymentController::history
 * @see app/Http/Controllers/PaymentController.php:297
 * @route '/admin/payments/history'
 */
historya8981b756a32929fe0be20b83856aeb5.url = (options?: RouteQueryOptions) => {
    return historya8981b756a32929fe0be20b83856aeb5.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::history
 * @see app/Http/Controllers/PaymentController.php:297
 * @route '/admin/payments/history'
 */
historya8981b756a32929fe0be20b83856aeb5.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: historya8981b756a32929fe0be20b83856aeb5.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PaymentController::history
 * @see app/Http/Controllers/PaymentController.php:297
 * @route '/admin/payments/history'
 */
historya8981b756a32929fe0be20b83856aeb5.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: historya8981b756a32929fe0be20b83856aeb5.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PaymentController::history
 * @see app/Http/Controllers/PaymentController.php:297
 * @route '/admin/payments/history'
 */
    const historya8981b756a32929fe0be20b83856aeb5Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: historya8981b756a32929fe0be20b83856aeb5.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PaymentController::history
 * @see app/Http/Controllers/PaymentController.php:297
 * @route '/admin/payments/history'
 */
        historya8981b756a32929fe0be20b83856aeb5Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: historya8981b756a32929fe0be20b83856aeb5.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PaymentController::history
 * @see app/Http/Controllers/PaymentController.php:297
 * @route '/admin/payments/history'
 */
        historya8981b756a32929fe0be20b83856aeb5Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: historya8981b756a32929fe0be20b83856aeb5.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    historya8981b756a32929fe0be20b83856aeb5.form = historya8981b756a32929fe0be20b83856aeb5Form

export const history = {
    '/payments/history': history170a1c1f55dea84b0476ca03130eedef,
    '/admin/payments/history': historya8981b756a32929fe0be20b83856aeb5,
}

/**
* @see \App\Http\Controllers\PaymentController::ledger
 * @see app/Http/Controllers/PaymentController.php:373
 * @route '/payments/ledger'
 */
const ledgerd5697b976e65d4dae60c58385137d576 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ledgerd5697b976e65d4dae60c58385137d576.url(options),
    method: 'get',
})

ledgerd5697b976e65d4dae60c58385137d576.definition = {
    methods: ["get","head"],
    url: '/payments/ledger',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PaymentController::ledger
 * @see app/Http/Controllers/PaymentController.php:373
 * @route '/payments/ledger'
 */
ledgerd5697b976e65d4dae60c58385137d576.url = (options?: RouteQueryOptions) => {
    return ledgerd5697b976e65d4dae60c58385137d576.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::ledger
 * @see app/Http/Controllers/PaymentController.php:373
 * @route '/payments/ledger'
 */
ledgerd5697b976e65d4dae60c58385137d576.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ledgerd5697b976e65d4dae60c58385137d576.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PaymentController::ledger
 * @see app/Http/Controllers/PaymentController.php:373
 * @route '/payments/ledger'
 */
ledgerd5697b976e65d4dae60c58385137d576.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ledgerd5697b976e65d4dae60c58385137d576.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PaymentController::ledger
 * @see app/Http/Controllers/PaymentController.php:373
 * @route '/payments/ledger'
 */
    const ledgerd5697b976e65d4dae60c58385137d576Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ledgerd5697b976e65d4dae60c58385137d576.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PaymentController::ledger
 * @see app/Http/Controllers/PaymentController.php:373
 * @route '/payments/ledger'
 */
        ledgerd5697b976e65d4dae60c58385137d576Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ledgerd5697b976e65d4dae60c58385137d576.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PaymentController::ledger
 * @see app/Http/Controllers/PaymentController.php:373
 * @route '/payments/ledger'
 */
        ledgerd5697b976e65d4dae60c58385137d576Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ledgerd5697b976e65d4dae60c58385137d576.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ledgerd5697b976e65d4dae60c58385137d576.form = ledgerd5697b976e65d4dae60c58385137d576Form
    /**
* @see \App\Http\Controllers\PaymentController::ledger
 * @see app/Http/Controllers/PaymentController.php:373
 * @route '/admin/payments/ledger'
 */
const ledger1359b3e12fb0dcc8bd49ee2264e02a80 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ledger1359b3e12fb0dcc8bd49ee2264e02a80.url(options),
    method: 'get',
})

ledger1359b3e12fb0dcc8bd49ee2264e02a80.definition = {
    methods: ["get","head"],
    url: '/admin/payments/ledger',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PaymentController::ledger
 * @see app/Http/Controllers/PaymentController.php:373
 * @route '/admin/payments/ledger'
 */
ledger1359b3e12fb0dcc8bd49ee2264e02a80.url = (options?: RouteQueryOptions) => {
    return ledger1359b3e12fb0dcc8bd49ee2264e02a80.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::ledger
 * @see app/Http/Controllers/PaymentController.php:373
 * @route '/admin/payments/ledger'
 */
ledger1359b3e12fb0dcc8bd49ee2264e02a80.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ledger1359b3e12fb0dcc8bd49ee2264e02a80.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PaymentController::ledger
 * @see app/Http/Controllers/PaymentController.php:373
 * @route '/admin/payments/ledger'
 */
ledger1359b3e12fb0dcc8bd49ee2264e02a80.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ledger1359b3e12fb0dcc8bd49ee2264e02a80.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PaymentController::ledger
 * @see app/Http/Controllers/PaymentController.php:373
 * @route '/admin/payments/ledger'
 */
    const ledger1359b3e12fb0dcc8bd49ee2264e02a80Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ledger1359b3e12fb0dcc8bd49ee2264e02a80.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PaymentController::ledger
 * @see app/Http/Controllers/PaymentController.php:373
 * @route '/admin/payments/ledger'
 */
        ledger1359b3e12fb0dcc8bd49ee2264e02a80Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ledger1359b3e12fb0dcc8bd49ee2264e02a80.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PaymentController::ledger
 * @see app/Http/Controllers/PaymentController.php:373
 * @route '/admin/payments/ledger'
 */
        ledger1359b3e12fb0dcc8bd49ee2264e02a80Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ledger1359b3e12fb0dcc8bd49ee2264e02a80.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ledger1359b3e12fb0dcc8bd49ee2264e02a80.form = ledger1359b3e12fb0dcc8bd49ee2264e02a80Form

export const ledger = {
    '/payments/ledger': ledgerd5697b976e65d4dae60c58385137d576,
    '/admin/payments/ledger': ledger1359b3e12fb0dcc8bd49ee2264e02a80,
}

/**
* @see \App\Http\Controllers\PaymentController::adminUpdateStatus
 * @see app/Http/Controllers/PaymentController.php:426
 * @route '/admin/payments/{payment}/status'
 */
export const adminUpdateStatus = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: adminUpdateStatus.url(args, options),
    method: 'post',
})

adminUpdateStatus.definition = {
    methods: ["post"],
    url: '/admin/payments/{payment}/status',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PaymentController::adminUpdateStatus
 * @see app/Http/Controllers/PaymentController.php:426
 * @route '/admin/payments/{payment}/status'
 */
adminUpdateStatus.url = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { payment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { payment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    payment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        payment: typeof args.payment === 'object'
                ? args.payment.id
                : args.payment,
                }

    return adminUpdateStatus.definition.url
            .replace('{payment}', parsedArgs.payment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::adminUpdateStatus
 * @see app/Http/Controllers/PaymentController.php:426
 * @route '/admin/payments/{payment}/status'
 */
adminUpdateStatus.post = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: adminUpdateStatus.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PaymentController::adminUpdateStatus
 * @see app/Http/Controllers/PaymentController.php:426
 * @route '/admin/payments/{payment}/status'
 */
    const adminUpdateStatusForm = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: adminUpdateStatus.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PaymentController::adminUpdateStatus
 * @see app/Http/Controllers/PaymentController.php:426
 * @route '/admin/payments/{payment}/status'
 */
        adminUpdateStatusForm.post = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: adminUpdateStatus.url(args, options),
            method: 'post',
        })
    
    adminUpdateStatus.form = adminUpdateStatusForm
/**
* @see \App\Http\Controllers\PaymentController::adminCheckStatus
 * @see app/Http/Controllers/PaymentController.php:487
 * @route '/admin/payments/{payment}/check'
 */
export const adminCheckStatus = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: adminCheckStatus.url(args, options),
    method: 'post',
})

adminCheckStatus.definition = {
    methods: ["post"],
    url: '/admin/payments/{payment}/check',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PaymentController::adminCheckStatus
 * @see app/Http/Controllers/PaymentController.php:487
 * @route '/admin/payments/{payment}/check'
 */
adminCheckStatus.url = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { payment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { payment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    payment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        payment: typeof args.payment === 'object'
                ? args.payment.id
                : args.payment,
                }

    return adminCheckStatus.definition.url
            .replace('{payment}', parsedArgs.payment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::adminCheckStatus
 * @see app/Http/Controllers/PaymentController.php:487
 * @route '/admin/payments/{payment}/check'
 */
adminCheckStatus.post = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: adminCheckStatus.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PaymentController::adminCheckStatus
 * @see app/Http/Controllers/PaymentController.php:487
 * @route '/admin/payments/{payment}/check'
 */
    const adminCheckStatusForm = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: adminCheckStatus.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PaymentController::adminCheckStatus
 * @see app/Http/Controllers/PaymentController.php:487
 * @route '/admin/payments/{payment}/check'
 */
        adminCheckStatusForm.post = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: adminCheckStatus.url(args, options),
            method: 'post',
        })
    
    adminCheckStatus.form = adminCheckStatusForm
const PaymentController = { manualForm, manualStore, create, createOrder, success, failure, history, ledger, adminUpdateStatus, adminCheckStatus }

export default PaymentController