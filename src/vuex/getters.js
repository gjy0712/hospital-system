const getters = {
    addRouters: state => state.permission.addRouters,
    roles: state => state.roles,
    routersExpand: state => {
        return expendRouters(state.permission.addRouters)
    }
}

// 展开路由表
function expendRouters(routers) {
    return routers.reduce((retRouters, router) => {
        if (router.hasOwnProperty('name')){
            delete router.name
        }
        if (router.hasOwnProperty('id') && router.hasOwnProperty('meta')) {
            router.meta.id = router.id
        }
        if (router.children) {
            if (router.component && router.component !=='layout') {
                if (router.name){
                    delete router.name
                }
                let copeRouter = Object.assign({}, router)
                delete copeRouter.children
                return retRouters.concat(
                    [copeRouter],
                    [...expendRouters(router.children)]
                )
            } else {
                return retRouters.concat([...expendRouters(router.children)])
            }
        } else {
            return retRouters.concat([router])
        }
    }, [])
}

export default getters
