import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\PaymentApprovalController::index
 * @see app/Http/Controllers/Admin/PaymentApprovalController.php:23
 * @route '/admin/payments/manual-requests'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/payments/manual-requests',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PaymentApprovalController::index
 * @see app/Http/Controllers/Admin/PaymentApprovalController.php:23
 * @route '/admin/payments/manual-requests'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PaymentApprovalController::index
 * @see app/Http/Controllers/Admin/PaymentApprovalController.php:23
 * @route '/admin/payments/manual-requests'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\PaymentApprovalController::index
 * @see app/Http/Controllers/Admin/PaymentApprovalController.php:23
 * @route '/admin/payments/manual-requests'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\PaymentApprovalController::index
 * @see app/Http/Controllers/Admin/PaymentApprovalController.php:23
 * @route '/admin/payments/manual-requests'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\PaymentApprovalController::index
 * @see app/Http/Controllers/Admin/PaymentApprovalController.php:23
 * @route '/admin/payments/manual-requests'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\PaymentApprovalController::index
 * @see app/Http/Controllers/Admin/PaymentApprovalController.php:23
 * @route '/admin/payments/manual-requests'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Admin\PaymentApprovalController::exportMethod
 * @see app/Http/Controllers/Admin/PaymentApprovalController.php:199
 * @route '/admin/payments/manual-requests/export'
 */
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/admin/payments/manual-requests/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PaymentApprovalController::exportMethod
 * @see app/Http/Controllers/Admin/PaymentApprovalController.php:199
 * @route '/admin/payments/manual-requests/export'
 */
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PaymentApprovalController::exportMethod
 * @see app/Http/Controllers/Admin/PaymentApprovalController.php:199
 * @route '/admin/payments/manual-requests/export'
 */
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\PaymentApprovalController::exportMethod
 * @see app/Http/Controllers/Admin/PaymentApprovalController.php:199
 * @route '/admin/payments/manual-requests/export'
 */
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\PaymentApprovalController::exportMethod
 * @see app/Http/Controllers/Admin/PaymentApprovalController.php:199
 * @route '/admin/payments/manual-requests/export'
 */
    const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethod.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\PaymentApprovalController::exportMethod
 * @see app/Http/Controllers/Admin/PaymentApprovalController.php:199
 * @route '/admin/payments/manual-requests/export'
 */
        exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\PaymentApprovalController::exportMethod
 * @see app/Http/Controllers/Admin/PaymentApprovalController.php:199
 * @route '/admin/payments/manual-requests/export'
 */
        exportMethodForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportMethod.form = exportMethodForm
/**
* @see \App\Http\Controllers\Admin\PaymentApprovalController::approve
 * @see app/Http/Controllers/Admin/PaymentApprovalController.php:132
 * @route '/admin/payments/{payment}/approve'
 */
export const approve = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

approve.definition = {
    methods: ["post"],
    url: '/admin/payments/{payment}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PaymentApprovalController::approve
 * @see app/Http/Controllers/Admin/PaymentApprovalController.php:132
 * @route '/admin/payments/{payment}/approve'
 */
approve.url = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return approve.definition.url
            .replace('{payment}', parsedArgs.payment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PaymentApprovalController::approve
 * @see app/Http/Controllers/Admin/PaymentApprovalController.php:132
 * @route '/admin/payments/{payment}/approve'
 */
approve.post = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\PaymentApprovalController::approve
 * @see app/Http/Controllers/Admin/PaymentApprovalController.php:132
 * @route '/admin/payments/{payment}/approve'
 */
    const approveForm = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: approve.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\PaymentApprovalController::approve
 * @see app/Http/Controllers/Admin/PaymentApprovalController.php:132
 * @route '/admin/payments/{payment}/approve'
 */
        approveForm.post = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: approve.url(args, options),
            method: 'post',
        })
    
    approve.form = approveForm
/**
* @see \App\Http\Controllers\Admin\PaymentApprovalController::reject
 * @see app/Http/Controllers/Admin/PaymentApprovalController.php:173
 * @route '/admin/payments/{payment}/reject'
 */
export const reject = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/admin/payments/{payment}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PaymentApprovalController::reject
 * @see app/Http/Controllers/Admin/PaymentApprovalController.php:173
 * @route '/admin/payments/{payment}/reject'
 */
reject.url = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return reject.definition.url
            .replace('{payment}', parsedArgs.payment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PaymentApprovalController::reject
 * @see app/Http/Controllers/Admin/PaymentApprovalController.php:173
 * @route '/admin/payments/{payment}/reject'
 */
reject.post = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\PaymentApprovalController::reject
 * @see app/Http/Controllers/Admin/PaymentApprovalController.php:173
 * @route '/admin/payments/{payment}/reject'
 */
    const rejectForm = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reject.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\PaymentApprovalController::reject
 * @see app/Http/Controllers/Admin/PaymentApprovalController.php:173
 * @route '/admin/payments/{payment}/reject'
 */
        rejectForm.post = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reject.url(args, options),
            method: 'post',
        })
    
    reject.form = rejectForm
const PaymentApprovalController = { index, exportMethod, approve, reject, export: exportMethod }

export default PaymentApprovalController