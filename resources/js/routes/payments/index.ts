import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import manual from './manual'
/**
* @see \App\Http\Controllers\PaymentController::create5ade6c
 * @see app/Http/Controllers/PaymentController.php:31
 * @route '/payments/add-funds'
 */
export const create5ade6c = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create5ade6c.url(options),
    method: 'get',
})

create5ade6c.definition = {
    methods: ["get","head"],
    url: '/payments/add-funds',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PaymentController::create5ade6c
 * @see app/Http/Controllers/PaymentController.php:31
 * @route '/payments/add-funds'
 */
create5ade6c.url = (options?: RouteQueryOptions) => {
    return create5ade6c.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::create5ade6c
 * @see app/Http/Controllers/PaymentController.php:31
 * @route '/payments/add-funds'
 */
create5ade6c.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create5ade6c.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PaymentController::create5ade6c
 * @see app/Http/Controllers/PaymentController.php:31
 * @route '/payments/add-funds'
 */
create5ade6c.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create5ade6c.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PaymentController::create5ade6c
 * @see app/Http/Controllers/PaymentController.php:31
 * @route '/payments/add-funds'
 */
    const create5ade6cForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create5ade6c.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PaymentController::create5ade6c
 * @see app/Http/Controllers/PaymentController.php:31
 * @route '/payments/add-funds'
 */
        create5ade6cForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create5ade6c.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PaymentController::create5ade6c
 * @see app/Http/Controllers/PaymentController.php:31
 * @route '/payments/add-funds'
 */
        create5ade6cForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create5ade6c.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create5ade6c.form = create5ade6cForm
/**
* @see \App\Http\Controllers\PaymentController::create1b2011
 * @see app/Http/Controllers/PaymentController.php:31
 * @route '/admin/payments/add-funds'
 */
export const create1b2011 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create1b2011.url(options),
    method: 'get',
})

create1b2011.definition = {
    methods: ["get","head"],
    url: '/admin/payments/add-funds',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PaymentController::create1b2011
 * @see app/Http/Controllers/PaymentController.php:31
 * @route '/admin/payments/add-funds'
 */
create1b2011.url = (options?: RouteQueryOptions) => {
    return create1b2011.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::create1b2011
 * @see app/Http/Controllers/PaymentController.php:31
 * @route '/admin/payments/add-funds'
 */
create1b2011.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create1b2011.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PaymentController::create1b2011
 * @see app/Http/Controllers/PaymentController.php:31
 * @route '/admin/payments/add-funds'
 */
create1b2011.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create1b2011.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PaymentController::create1b2011
 * @see app/Http/Controllers/PaymentController.php:31
 * @route '/admin/payments/add-funds'
 */
    const create1b2011Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create1b2011.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PaymentController::create1b2011
 * @see app/Http/Controllers/PaymentController.php:31
 * @route '/admin/payments/add-funds'
 */
        create1b2011Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create1b2011.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PaymentController::create1b2011
 * @see app/Http/Controllers/PaymentController.php:31
 * @route '/admin/payments/add-funds'
 */
        create1b2011Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create1b2011.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create1b2011.form = create1b2011Form
/**
* @see \App\Http\Controllers\PaymentController::order4ba3dd
 * @see app/Http/Controllers/PaymentController.php:41
 * @route '/payments/order'
 */
export const order4ba3dd = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: order4ba3dd.url(options),
    method: 'post',
})

order4ba3dd.definition = {
    methods: ["post"],
    url: '/payments/order',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PaymentController::order4ba3dd
 * @see app/Http/Controllers/PaymentController.php:41
 * @route '/payments/order'
 */
order4ba3dd.url = (options?: RouteQueryOptions) => {
    return order4ba3dd.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::order4ba3dd
 * @see app/Http/Controllers/PaymentController.php:41
 * @route '/payments/order'
 */
order4ba3dd.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: order4ba3dd.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PaymentController::order4ba3dd
 * @see app/Http/Controllers/PaymentController.php:41
 * @route '/payments/order'
 */
    const order4ba3ddForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: order4ba3dd.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PaymentController::order4ba3dd
 * @see app/Http/Controllers/PaymentController.php:41
 * @route '/payments/order'
 */
        order4ba3ddForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: order4ba3dd.url(options),
            method: 'post',
        })
    
    order4ba3dd.form = order4ba3ddForm
/**
* @see \App\Http\Controllers\PaymentController::order2f66c5
 * @see app/Http/Controllers/PaymentController.php:41
 * @route '/admin/payments/order'
 */
export const order2f66c5 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: order2f66c5.url(options),
    method: 'post',
})

order2f66c5.definition = {
    methods: ["post"],
    url: '/admin/payments/order',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PaymentController::order2f66c5
 * @see app/Http/Controllers/PaymentController.php:41
 * @route '/admin/payments/order'
 */
order2f66c5.url = (options?: RouteQueryOptions) => {
    return order2f66c5.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::order2f66c5
 * @see app/Http/Controllers/PaymentController.php:41
 * @route '/admin/payments/order'
 */
order2f66c5.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: order2f66c5.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PaymentController::order2f66c5
 * @see app/Http/Controllers/PaymentController.php:41
 * @route '/admin/payments/order'
 */
    const order2f66c5Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: order2f66c5.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PaymentController::order2f66c5
 * @see app/Http/Controllers/PaymentController.php:41
 * @route '/admin/payments/order'
 */
        order2f66c5Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: order2f66c5.url(options),
            method: 'post',
        })
    
    order2f66c5.form = order2f66c5Form
/**
* @see \App\Http\Controllers\PaymentController::success7e4dc5
 * @see app/Http/Controllers/PaymentController.php:92
 * @route '/payments/success'
 */
export const success7e4dc5 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: success7e4dc5.url(options),
    method: 'post',
})

success7e4dc5.definition = {
    methods: ["post"],
    url: '/payments/success',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PaymentController::success7e4dc5
 * @see app/Http/Controllers/PaymentController.php:92
 * @route '/payments/success'
 */
success7e4dc5.url = (options?: RouteQueryOptions) => {
    return success7e4dc5.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::success7e4dc5
 * @see app/Http/Controllers/PaymentController.php:92
 * @route '/payments/success'
 */
success7e4dc5.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: success7e4dc5.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PaymentController::success7e4dc5
 * @see app/Http/Controllers/PaymentController.php:92
 * @route '/payments/success'
 */
    const success7e4dc5Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: success7e4dc5.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PaymentController::success7e4dc5
 * @see app/Http/Controllers/PaymentController.php:92
 * @route '/payments/success'
 */
        success7e4dc5Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: success7e4dc5.url(options),
            method: 'post',
        })
    
    success7e4dc5.form = success7e4dc5Form
/**
* @see \App\Http\Controllers\PaymentController::successFd6392
 * @see app/Http/Controllers/PaymentController.php:92
 * @route '/admin/payments/success'
 */
export const successFd6392 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: successFd6392.url(options),
    method: 'post',
})

successFd6392.definition = {
    methods: ["post"],
    url: '/admin/payments/success',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PaymentController::successFd6392
 * @see app/Http/Controllers/PaymentController.php:92
 * @route '/admin/payments/success'
 */
successFd6392.url = (options?: RouteQueryOptions) => {
    return successFd6392.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::successFd6392
 * @see app/Http/Controllers/PaymentController.php:92
 * @route '/admin/payments/success'
 */
successFd6392.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: successFd6392.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PaymentController::successFd6392
 * @see app/Http/Controllers/PaymentController.php:92
 * @route '/admin/payments/success'
 */
    const successFd6392Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: successFd6392.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PaymentController::successFd6392
 * @see app/Http/Controllers/PaymentController.php:92
 * @route '/admin/payments/success'
 */
        successFd6392Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: successFd6392.url(options),
            method: 'post',
        })
    
    successFd6392.form = successFd6392Form
/**
* @see \App\Http\Controllers\PaymentController::failure96302b
 * @see app/Http/Controllers/PaymentController.php:167
 * @route '/payments/failure'
 */
export const failure96302b = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: failure96302b.url(options),
    method: 'post',
})

failure96302b.definition = {
    methods: ["post"],
    url: '/payments/failure',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PaymentController::failure96302b
 * @see app/Http/Controllers/PaymentController.php:167
 * @route '/payments/failure'
 */
failure96302b.url = (options?: RouteQueryOptions) => {
    return failure96302b.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::failure96302b
 * @see app/Http/Controllers/PaymentController.php:167
 * @route '/payments/failure'
 */
failure96302b.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: failure96302b.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PaymentController::failure96302b
 * @see app/Http/Controllers/PaymentController.php:167
 * @route '/payments/failure'
 */
    const failure96302bForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: failure96302b.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PaymentController::failure96302b
 * @see app/Http/Controllers/PaymentController.php:167
 * @route '/payments/failure'
 */
        failure96302bForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: failure96302b.url(options),
            method: 'post',
        })
    
    failure96302b.form = failure96302bForm
/**
* @see \App\Http\Controllers\PaymentController::failureE53f38
 * @see app/Http/Controllers/PaymentController.php:167
 * @route '/admin/payments/failure'
 */
export const failureE53f38 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: failureE53f38.url(options),
    method: 'post',
})

failureE53f38.definition = {
    methods: ["post"],
    url: '/admin/payments/failure',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PaymentController::failureE53f38
 * @see app/Http/Controllers/PaymentController.php:167
 * @route '/admin/payments/failure'
 */
failureE53f38.url = (options?: RouteQueryOptions) => {
    return failureE53f38.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::failureE53f38
 * @see app/Http/Controllers/PaymentController.php:167
 * @route '/admin/payments/failure'
 */
failureE53f38.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: failureE53f38.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PaymentController::failureE53f38
 * @see app/Http/Controllers/PaymentController.php:167
 * @route '/admin/payments/failure'
 */
    const failureE53f38Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: failureE53f38.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PaymentController::failureE53f38
 * @see app/Http/Controllers/PaymentController.php:167
 * @route '/admin/payments/failure'
 */
        failureE53f38Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: failureE53f38.url(options),
            method: 'post',
        })
    
    failureE53f38.form = failureE53f38Form
/**
* @see \App\Http\Controllers\PaymentController::history170a1c
 * @see app/Http/Controllers/PaymentController.php:234
 * @route '/payments/history'
 */
export const history170a1c = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history170a1c.url(options),
    method: 'get',
})

history170a1c.definition = {
    methods: ["get","head"],
    url: '/payments/history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PaymentController::history170a1c
 * @see app/Http/Controllers/PaymentController.php:234
 * @route '/payments/history'
 */
history170a1c.url = (options?: RouteQueryOptions) => {
    return history170a1c.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::history170a1c
 * @see app/Http/Controllers/PaymentController.php:234
 * @route '/payments/history'
 */
history170a1c.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history170a1c.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PaymentController::history170a1c
 * @see app/Http/Controllers/PaymentController.php:234
 * @route '/payments/history'
 */
history170a1c.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: history170a1c.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PaymentController::history170a1c
 * @see app/Http/Controllers/PaymentController.php:234
 * @route '/payments/history'
 */
    const history170a1cForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: history170a1c.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PaymentController::history170a1c
 * @see app/Http/Controllers/PaymentController.php:234
 * @route '/payments/history'
 */
        history170a1cForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: history170a1c.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PaymentController::history170a1c
 * @see app/Http/Controllers/PaymentController.php:234
 * @route '/payments/history'
 */
        history170a1cForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: history170a1c.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    history170a1c.form = history170a1cForm
/**
* @see \App\Http\Controllers\PaymentController::historyA8981b
 * @see app/Http/Controllers/PaymentController.php:234
 * @route '/admin/payments/history'
 */
export const historyA8981b = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: historyA8981b.url(options),
    method: 'get',
})

historyA8981b.definition = {
    methods: ["get","head"],
    url: '/admin/payments/history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PaymentController::historyA8981b
 * @see app/Http/Controllers/PaymentController.php:234
 * @route '/admin/payments/history'
 */
historyA8981b.url = (options?: RouteQueryOptions) => {
    return historyA8981b.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::historyA8981b
 * @see app/Http/Controllers/PaymentController.php:234
 * @route '/admin/payments/history'
 */
historyA8981b.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: historyA8981b.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PaymentController::historyA8981b
 * @see app/Http/Controllers/PaymentController.php:234
 * @route '/admin/payments/history'
 */
historyA8981b.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: historyA8981b.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PaymentController::historyA8981b
 * @see app/Http/Controllers/PaymentController.php:234
 * @route '/admin/payments/history'
 */
    const historyA8981bForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: historyA8981b.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PaymentController::historyA8981b
 * @see app/Http/Controllers/PaymentController.php:234
 * @route '/admin/payments/history'
 */
        historyA8981bForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: historyA8981b.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PaymentController::historyA8981b
 * @see app/Http/Controllers/PaymentController.php:234
 * @route '/admin/payments/history'
 */
        historyA8981bForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: historyA8981b.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    historyA8981b.form = historyA8981bForm
/**
* @see \App\Http\Controllers\PaymentController::ledgerD5697b
 * @see app/Http/Controllers/PaymentController.php:310
 * @route '/payments/ledger'
 */
export const ledgerD5697b = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ledgerD5697b.url(options),
    method: 'get',
})

ledgerD5697b.definition = {
    methods: ["get","head"],
    url: '/payments/ledger',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PaymentController::ledgerD5697b
 * @see app/Http/Controllers/PaymentController.php:310
 * @route '/payments/ledger'
 */
ledgerD5697b.url = (options?: RouteQueryOptions) => {
    return ledgerD5697b.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::ledgerD5697b
 * @see app/Http/Controllers/PaymentController.php:310
 * @route '/payments/ledger'
 */
ledgerD5697b.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ledgerD5697b.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PaymentController::ledgerD5697b
 * @see app/Http/Controllers/PaymentController.php:310
 * @route '/payments/ledger'
 */
ledgerD5697b.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ledgerD5697b.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PaymentController::ledgerD5697b
 * @see app/Http/Controllers/PaymentController.php:310
 * @route '/payments/ledger'
 */
    const ledgerD5697bForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ledgerD5697b.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PaymentController::ledgerD5697b
 * @see app/Http/Controllers/PaymentController.php:310
 * @route '/payments/ledger'
 */
        ledgerD5697bForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ledgerD5697b.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PaymentController::ledgerD5697b
 * @see app/Http/Controllers/PaymentController.php:310
 * @route '/payments/ledger'
 */
        ledgerD5697bForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ledgerD5697b.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ledgerD5697b.form = ledgerD5697bForm
/**
* @see \App\Http\Controllers\PaymentController::ledger1359b3
 * @see app/Http/Controllers/PaymentController.php:310
 * @route '/admin/payments/ledger'
 */
export const ledger1359b3 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ledger1359b3.url(options),
    method: 'get',
})

ledger1359b3.definition = {
    methods: ["get","head"],
    url: '/admin/payments/ledger',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PaymentController::ledger1359b3
 * @see app/Http/Controllers/PaymentController.php:310
 * @route '/admin/payments/ledger'
 */
ledger1359b3.url = (options?: RouteQueryOptions) => {
    return ledger1359b3.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::ledger1359b3
 * @see app/Http/Controllers/PaymentController.php:310
 * @route '/admin/payments/ledger'
 */
ledger1359b3.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ledger1359b3.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PaymentController::ledger1359b3
 * @see app/Http/Controllers/PaymentController.php:310
 * @route '/admin/payments/ledger'
 */
ledger1359b3.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ledger1359b3.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PaymentController::ledger1359b3
 * @see app/Http/Controllers/PaymentController.php:310
 * @route '/admin/payments/ledger'
 */
    const ledger1359b3Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ledger1359b3.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PaymentController::ledger1359b3
 * @see app/Http/Controllers/PaymentController.php:310
 * @route '/admin/payments/ledger'
 */
        ledger1359b3Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ledger1359b3.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PaymentController::ledger1359b3
 * @see app/Http/Controllers/PaymentController.php:310
 * @route '/admin/payments/ledger'
 */
        ledger1359b3Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ledger1359b3.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ledger1359b3.form = ledger1359b3Form
const payments = {
    manual: manual,
    create: Object.assign(create5ade6c, create1b2011),
    order: Object.assign(order4ba3dd, order2f66c5),
    success: Object.assign(success7e4dc5, successFd6392),
    failure: Object.assign(failure96302b, failureE53f38),
    history: Object.assign(history170a1c, historyA8981b),
    ledger: Object.assign(ledgerD5697b, ledger1359b3),
}

export default payments