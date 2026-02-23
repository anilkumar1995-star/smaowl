import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import keys from './keys'
/**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::keysD98669
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:17
 * @route '/developer/keys'
 */
export const keysD98669 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: keysD98669.url(options),
    method: 'get',
})

keysD98669.definition = {
    methods: ["get","head"],
    url: '/developer/keys',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::keysD98669
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:17
 * @route '/developer/keys'
 */
keysD98669.url = (options?: RouteQueryOptions) => {
    return keysD98669.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::keysD98669
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:17
 * @route '/developer/keys'
 */
keysD98669.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: keysD98669.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::keysD98669
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:17
 * @route '/developer/keys'
 */
keysD98669.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: keysD98669.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::keysD98669
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:17
 * @route '/developer/keys'
 */
    const keysD98669Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: keysD98669.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::keysD98669
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:17
 * @route '/developer/keys'
 */
        keysD98669Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: keysD98669.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::keysD98669
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:17
 * @route '/developer/keys'
 */
        keysD98669Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: keysD98669.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    keysD98669.form = keysD98669Form
/**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::keysC42a60
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:17
 * @route '/admin/developer/keys'
 */
export const keysC42a60 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: keysC42a60.url(options),
    method: 'get',
})

keysC42a60.definition = {
    methods: ["get","head"],
    url: '/admin/developer/keys',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::keysC42a60
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:17
 * @route '/admin/developer/keys'
 */
keysC42a60.url = (options?: RouteQueryOptions) => {
    return keysC42a60.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::keysC42a60
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:17
 * @route '/admin/developer/keys'
 */
keysC42a60.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: keysC42a60.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::keysC42a60
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:17
 * @route '/admin/developer/keys'
 */
keysC42a60.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: keysC42a60.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::keysC42a60
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:17
 * @route '/admin/developer/keys'
 */
    const keysC42a60Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: keysC42a60.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::keysC42a60
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:17
 * @route '/admin/developer/keys'
 */
        keysC42a60Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: keysC42a60.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::keysC42a60
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:17
 * @route '/admin/developer/keys'
 */
        keysC42a60Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: keysC42a60.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    keysC42a60.form = keysC42a60Form
const developer = {
    keys: Object.assign(keysD98669, keysC42a60),
}

export default developer