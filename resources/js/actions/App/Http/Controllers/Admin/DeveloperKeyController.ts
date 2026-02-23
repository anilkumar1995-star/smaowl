import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::index
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:17
 * @route '/developer/keys'
 */
const indexd986697d563db5e9a15cabde04caf58d = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexd986697d563db5e9a15cabde04caf58d.url(options),
    method: 'get',
})

indexd986697d563db5e9a15cabde04caf58d.definition = {
    methods: ["get","head"],
    url: '/developer/keys',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::index
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:17
 * @route '/developer/keys'
 */
indexd986697d563db5e9a15cabde04caf58d.url = (options?: RouteQueryOptions) => {
    return indexd986697d563db5e9a15cabde04caf58d.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::index
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:17
 * @route '/developer/keys'
 */
indexd986697d563db5e9a15cabde04caf58d.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexd986697d563db5e9a15cabde04caf58d.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::index
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:17
 * @route '/developer/keys'
 */
indexd986697d563db5e9a15cabde04caf58d.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexd986697d563db5e9a15cabde04caf58d.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::index
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:17
 * @route '/developer/keys'
 */
    const indexd986697d563db5e9a15cabde04caf58dForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indexd986697d563db5e9a15cabde04caf58d.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::index
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:17
 * @route '/developer/keys'
 */
        indexd986697d563db5e9a15cabde04caf58dForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexd986697d563db5e9a15cabde04caf58d.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::index
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:17
 * @route '/developer/keys'
 */
        indexd986697d563db5e9a15cabde04caf58dForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexd986697d563db5e9a15cabde04caf58d.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    indexd986697d563db5e9a15cabde04caf58d.form = indexd986697d563db5e9a15cabde04caf58dForm
    /**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::index
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:17
 * @route '/admin/developer/keys'
 */
const indexc42a60c0e88f5fff937515cad3851471 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexc42a60c0e88f5fff937515cad3851471.url(options),
    method: 'get',
})

indexc42a60c0e88f5fff937515cad3851471.definition = {
    methods: ["get","head"],
    url: '/admin/developer/keys',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::index
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:17
 * @route '/admin/developer/keys'
 */
indexc42a60c0e88f5fff937515cad3851471.url = (options?: RouteQueryOptions) => {
    return indexc42a60c0e88f5fff937515cad3851471.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::index
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:17
 * @route '/admin/developer/keys'
 */
indexc42a60c0e88f5fff937515cad3851471.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexc42a60c0e88f5fff937515cad3851471.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::index
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:17
 * @route '/admin/developer/keys'
 */
indexc42a60c0e88f5fff937515cad3851471.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexc42a60c0e88f5fff937515cad3851471.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::index
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:17
 * @route '/admin/developer/keys'
 */
    const indexc42a60c0e88f5fff937515cad3851471Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indexc42a60c0e88f5fff937515cad3851471.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::index
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:17
 * @route '/admin/developer/keys'
 */
        indexc42a60c0e88f5fff937515cad3851471Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexc42a60c0e88f5fff937515cad3851471.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::index
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:17
 * @route '/admin/developer/keys'
 */
        indexc42a60c0e88f5fff937515cad3851471Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexc42a60c0e88f5fff937515cad3851471.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    indexc42a60c0e88f5fff937515cad3851471.form = indexc42a60c0e88f5fff937515cad3851471Form

export const index = {
    '/developer/keys': indexd986697d563db5e9a15cabde04caf58d,
    '/admin/developer/keys': indexc42a60c0e88f5fff937515cad3851471,
}

/**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::store
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:44
 * @route '/developer/keys'
 */
const stored986697d563db5e9a15cabde04caf58d = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stored986697d563db5e9a15cabde04caf58d.url(options),
    method: 'post',
})

stored986697d563db5e9a15cabde04caf58d.definition = {
    methods: ["post"],
    url: '/developer/keys',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::store
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:44
 * @route '/developer/keys'
 */
stored986697d563db5e9a15cabde04caf58d.url = (options?: RouteQueryOptions) => {
    return stored986697d563db5e9a15cabde04caf58d.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::store
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:44
 * @route '/developer/keys'
 */
stored986697d563db5e9a15cabde04caf58d.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stored986697d563db5e9a15cabde04caf58d.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::store
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:44
 * @route '/developer/keys'
 */
    const stored986697d563db5e9a15cabde04caf58dForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: stored986697d563db5e9a15cabde04caf58d.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::store
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:44
 * @route '/developer/keys'
 */
        stored986697d563db5e9a15cabde04caf58dForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: stored986697d563db5e9a15cabde04caf58d.url(options),
            method: 'post',
        })
    
    stored986697d563db5e9a15cabde04caf58d.form = stored986697d563db5e9a15cabde04caf58dForm
    /**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::store
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:44
 * @route '/admin/developer/keys'
 */
const storec42a60c0e88f5fff937515cad3851471 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storec42a60c0e88f5fff937515cad3851471.url(options),
    method: 'post',
})

storec42a60c0e88f5fff937515cad3851471.definition = {
    methods: ["post"],
    url: '/admin/developer/keys',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::store
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:44
 * @route '/admin/developer/keys'
 */
storec42a60c0e88f5fff937515cad3851471.url = (options?: RouteQueryOptions) => {
    return storec42a60c0e88f5fff937515cad3851471.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::store
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:44
 * @route '/admin/developer/keys'
 */
storec42a60c0e88f5fff937515cad3851471.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storec42a60c0e88f5fff937515cad3851471.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::store
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:44
 * @route '/admin/developer/keys'
 */
    const storec42a60c0e88f5fff937515cad3851471Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storec42a60c0e88f5fff937515cad3851471.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::store
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:44
 * @route '/admin/developer/keys'
 */
        storec42a60c0e88f5fff937515cad3851471Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storec42a60c0e88f5fff937515cad3851471.url(options),
            method: 'post',
        })
    
    storec42a60c0e88f5fff937515cad3851471.form = storec42a60c0e88f5fff937515cad3851471Form

export const store = {
    '/developer/keys': stored986697d563db5e9a15cabde04caf58d,
    '/admin/developer/keys': storec42a60c0e88f5fff937515cad3851471,
}

/**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::revoke
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:79
 * @route '/developer/keys/{key}/revoke'
 */
const revoke6f080781acd6fffb748a8cc8256a9bca = (args: { key: number | { id: number } } | [key: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: revoke6f080781acd6fffb748a8cc8256a9bca.url(args, options),
    method: 'post',
})

revoke6f080781acd6fffb748a8cc8256a9bca.definition = {
    methods: ["post"],
    url: '/developer/keys/{key}/revoke',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::revoke
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:79
 * @route '/developer/keys/{key}/revoke'
 */
revoke6f080781acd6fffb748a8cc8256a9bca.url = (args: { key: number | { id: number } } | [key: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return revoke6f080781acd6fffb748a8cc8256a9bca.definition.url
            .replace('{key}', parsedArgs.key.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::revoke
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:79
 * @route '/developer/keys/{key}/revoke'
 */
revoke6f080781acd6fffb748a8cc8256a9bca.post = (args: { key: number | { id: number } } | [key: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: revoke6f080781acd6fffb748a8cc8256a9bca.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::revoke
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:79
 * @route '/developer/keys/{key}/revoke'
 */
    const revoke6f080781acd6fffb748a8cc8256a9bcaForm = (args: { key: number | { id: number } } | [key: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: revoke6f080781acd6fffb748a8cc8256a9bca.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::revoke
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:79
 * @route '/developer/keys/{key}/revoke'
 */
        revoke6f080781acd6fffb748a8cc8256a9bcaForm.post = (args: { key: number | { id: number } } | [key: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: revoke6f080781acd6fffb748a8cc8256a9bca.url(args, options),
            method: 'post',
        })
    
    revoke6f080781acd6fffb748a8cc8256a9bca.form = revoke6f080781acd6fffb748a8cc8256a9bcaForm
    /**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::revoke
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:79
 * @route '/admin/developer/keys/{key}/revoke'
 */
const revoke9eda03006cf447f2741b040df00102ca = (args: { key: number | { id: number } } | [key: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: revoke9eda03006cf447f2741b040df00102ca.url(args, options),
    method: 'post',
})

revoke9eda03006cf447f2741b040df00102ca.definition = {
    methods: ["post"],
    url: '/admin/developer/keys/{key}/revoke',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::revoke
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:79
 * @route '/admin/developer/keys/{key}/revoke'
 */
revoke9eda03006cf447f2741b040df00102ca.url = (args: { key: number | { id: number } } | [key: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return revoke9eda03006cf447f2741b040df00102ca.definition.url
            .replace('{key}', parsedArgs.key.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::revoke
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:79
 * @route '/admin/developer/keys/{key}/revoke'
 */
revoke9eda03006cf447f2741b040df00102ca.post = (args: { key: number | { id: number } } | [key: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: revoke9eda03006cf447f2741b040df00102ca.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::revoke
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:79
 * @route '/admin/developer/keys/{key}/revoke'
 */
    const revoke9eda03006cf447f2741b040df00102caForm = (args: { key: number | { id: number } } | [key: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: revoke9eda03006cf447f2741b040df00102ca.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\DeveloperKeyController::revoke
 * @see app/Http/Controllers/Admin/DeveloperKeyController.php:79
 * @route '/admin/developer/keys/{key}/revoke'
 */
        revoke9eda03006cf447f2741b040df00102caForm.post = (args: { key: number | { id: number } } | [key: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: revoke9eda03006cf447f2741b040df00102ca.url(args, options),
            method: 'post',
        })
    
    revoke9eda03006cf447f2741b040df00102ca.form = revoke9eda03006cf447f2741b040df00102caForm

export const revoke = {
    '/developer/keys/{key}/revoke': revoke6f080781acd6fffb748a8cc8256a9bca,
    '/admin/developer/keys/{key}/revoke': revoke9eda03006cf447f2741b040df00102ca,
}

const DeveloperKeyController = { index, store, revoke }

export default DeveloperKeyController