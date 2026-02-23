import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::storeD98669
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:44
 * @route '/developer/keys'
 */
export const storeD98669 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeD98669.url(options),
    method: 'post',
})

storeD98669.definition = {
    methods: ["post"],
    url: '/developer/keys',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::storeD98669
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:44
 * @route '/developer/keys'
 */
storeD98669.url = (options?: RouteQueryOptions) => {
    return storeD98669.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::storeD98669
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:44
 * @route '/developer/keys'
 */
storeD98669.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeD98669.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::storeD98669
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:44
 * @route '/developer/keys'
 */
    const storeD98669Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeD98669.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::storeD98669
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:44
 * @route '/developer/keys'
 */
        storeD98669Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeD98669.url(options),
            method: 'post',
        })
    
    storeD98669.form = storeD98669Form
/**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::storeC42a60
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:44
 * @route '/admin/developer/keys'
 */
export const storeC42a60 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeC42a60.url(options),
    method: 'post',
})

storeC42a60.definition = {
    methods: ["post"],
    url: '/admin/developer/keys',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::storeC42a60
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:44
 * @route '/admin/developer/keys'
 */
storeC42a60.url = (options?: RouteQueryOptions) => {
    return storeC42a60.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::storeC42a60
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:44
 * @route '/admin/developer/keys'
 */
storeC42a60.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeC42a60.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::storeC42a60
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:44
 * @route '/admin/developer/keys'
 */
    const storeC42a60Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeC42a60.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::storeC42a60
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:44
 * @route '/admin/developer/keys'
 */
        storeC42a60Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeC42a60.url(options),
            method: 'post',
        })
    
    storeC42a60.form = storeC42a60Form
/**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::revoke6f0807
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:79
 * @route '/developer/keys/{key}/revoke'
 */
export const revoke6f0807 = (args: { key: number | { id: number } } | [key: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: revoke6f0807.url(args, options),
    method: 'post',
})

revoke6f0807.definition = {
    methods: ["post"],
    url: '/developer/keys/{key}/revoke',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::revoke6f0807
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:79
 * @route '/developer/keys/{key}/revoke'
 */
revoke6f0807.url = (args: { key: number | { id: number } } | [key: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { key: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { key: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    key: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        key: typeof args.key === 'object'
                ? args.key.id
                : args.key,
                }

    return revoke6f0807.definition.url
            .replace('{key}', parsedArgs.key.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::revoke6f0807
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:79
 * @route '/developer/keys/{key}/revoke'
 */
revoke6f0807.post = (args: { key: number | { id: number } } | [key: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: revoke6f0807.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::revoke6f0807
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:79
 * @route '/developer/keys/{key}/revoke'
 */
    const revoke6f0807Form = (args: { key: number | { id: number } } | [key: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: revoke6f0807.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::revoke6f0807
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:79
 * @route '/developer/keys/{key}/revoke'
 */
        revoke6f0807Form.post = (args: { key: number | { id: number } } | [key: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: revoke6f0807.url(args, options),
            method: 'post',
        })
    
    revoke6f0807.form = revoke6f0807Form
/**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::revoke9eda03
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:79
 * @route '/admin/developer/keys/{key}/revoke'
 */
export const revoke9eda03 = (args: { key: number | { id: number } } | [key: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: revoke9eda03.url(args, options),
    method: 'post',
})

revoke9eda03.definition = {
    methods: ["post"],
    url: '/admin/developer/keys/{key}/revoke',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::revoke9eda03
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:79
 * @route '/admin/developer/keys/{key}/revoke'
 */
revoke9eda03.url = (args: { key: number | { id: number } } | [key: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { key: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { key: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    key: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        key: typeof args.key === 'object'
                ? args.key.id
                : args.key,
                }

    return revoke9eda03.definition.url
            .replace('{key}', parsedArgs.key.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::revoke9eda03
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:79
 * @route '/admin/developer/keys/{key}/revoke'
 */
revoke9eda03.post = (args: { key: number | { id: number } } | [key: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: revoke9eda03.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::revoke9eda03
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:79
 * @route '/admin/developer/keys/{key}/revoke'
 */
    const revoke9eda03Form = (args: { key: number | { id: number } } | [key: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: revoke9eda03.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::revoke9eda03
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:79
 * @route '/admin/developer/keys/{key}/revoke'
 */
        revoke9eda03Form.post = (args: { key: number | { id: number } } | [key: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: revoke9eda03.url(args, options),
            method: 'post',
        })
    
    revoke9eda03.form = revoke9eda03Form
const keys = {
    store: Object.assign(storeD98669, storeC42a60),
    revoke: Object.assign(revoke6f0807, revoke9eda03),
}

export default keys