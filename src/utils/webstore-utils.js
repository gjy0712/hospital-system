/**
 * 存储localStorage
 */
export const setLocalStore = (name, content) => {
    if (!name) return
    if (typeof content !== 'string') {
        content = JSON.stringify(content)
    }
    localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getLocalStore = name => {
    if (!name) return
    return localStorage.getItem(name)
}

/**
 * 删除localStorage
 */
export const removeLocalStore = name => {
    if (!name) return
    localStorage.removeItem(name)
}

/**
 * 存储sessionStorage
 */
export const setSessionStore = (name, content) => {
    if (!name) return
    if (typeof content !== 'string') {
        content = JSON.stringify(content)
    }
    sessionStorage.setItem(name, content)
}

/**
 * 获取sessionStorage
 */
export const getSessionStore = name => {
    if (!name) return
    return sessionStorage.getItem(name)
}

/**
 * 删除sessionStorage
 */
export const removeSessionStore = name => {
    if (!name) return
    sessionStorage.removeItem(name)
}
