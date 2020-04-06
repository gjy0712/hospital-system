let comFun = {
    /* --------添加外部 css 文件--------*/
    mportExternalCss(url) {
        let cssLink = document.createElement('link')
        cssLink.href = url
        cssLink.rel = 'stylesheet'
        document.head.appendChild(cssLink)
    },
    /* --------添加外部 js 文件--------*/
    importExternalJs(url) {
        let jsLink = document.createElement('script')
        jsLink.src = url
        document.body.appendChild(jsLink)
    }
}

export default comFun
