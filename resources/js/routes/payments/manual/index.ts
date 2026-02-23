import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\PaymentController::create
 * @see app/Http/Controllers/PaymentController.php:201
 * @route '/payments/manual'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/payments/manual',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PaymentController::create
 * @see app/Http/Controllers/PaymentController.php:201
 * @route '/payments/manual'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::create
 * @see app/Http/Controllers/PaymentController.php:201
 * @route '/payments/manual'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PaymentController::create
 * @see app/Http/Controllers/PaymentController.php:201
 * @route '/payments/manual'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PaymentController::create
 * @see app/Http/Controllers/PaymentController.php:201
 * @route '/payments/manual'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PaymentController::create
 * @see app/Http/Controllers/PaymentController.php:201
 * @route '/payments/manual'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PaymentController::create
 * @see app/Http/Controllers/PaymentController.php:201
 * @route '/payments/manual'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\PaymentController::store
 * @see app/Http/Controllers/PaymentController.php:209
 * @route '/payments/manual'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/payments/manual',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PaymentController::store
 * @see app/Http/Controllers/PaymentController.php:209
 * @route '/payments/manual'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::store
 * @see app/Http/Controllers/PaymentController.php:209
 * @route '/payments/manual'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PaymentController::store
 * @see app/Http/Controllers/PaymentController.php:209
 * @route '/payments/manual'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PaymentController::store
 * @see app/Http/Controllers/PaymentController.php:209
 * @route '/payments/manual'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const manual = {
    create: create,
    store: store,
}
 
export default manual