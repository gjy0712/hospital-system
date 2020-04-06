import { defaultRouterMap, userAuthRouerMap } from '@/router/index'

/*const home = r =>
    require.ensure(
        [],
        () => r(require('@/components/component/layout')),
        'service'
    )*/
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.role) {
        return roles.some(role => route.meta.role.indexOf(role) >= 0)
    } else {
        return true
    }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param userAuthRouerMap
 * @param roles
 */
/* function filterAsyncRouter(userAuthRouerMap, roles) {
	const accessedRouters = userAuthRouerMap.filter(route => {
		if (hasPermission(roles, route)) {
			if (route.children && route.children.length) {
				route.children = filterAsyncRouter(route.children, roles)
			}
			return true
		}
		return false
	})
	return accessedRouters
}*/

export const filterAsyncRouter = (routers, roles) => {
    // 遍历后台传来的路由字符串，转换为组件对象
    const accessedRouters = routers.filter(router => {
        if (router.component) {
            if (router.component === 'layout') {
                // Layout组件特殊处理
                router.component = home
                router.meta.isParent = true
            } else {
                const component = router.component
                if (router.component) {
                    router.component = loadView(component)
                }
            }
        }
        if (true) {
            if (router.children && router.children.length) {
                router.children = filterAsyncRouter(router.children, roles)
            }
            return true
        }
        return false
    })
    return accessedRouters
}

const permission = {
    state: {
        routers: defaultRouterMap,
        addRouters: []
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers
            // state.routers = defaultRouterMap[1].children.concat(routers);
        }
    },
    actions: {
        GenerateRoutes({ commit }, data) {
            return new Promise(resolve => {
                const { asyncRouter, roles } = data
                let accessedRouters = filterAsyncRouter(asyncRouter, roles)
                commit('SET_ROUTERS', accessedRouters)
                resolve()
            })
        }
    }
}

export const loadView = view => {
    // 路由懒加载
    return () => import(`@/page/${view}`)
}

export default permission
