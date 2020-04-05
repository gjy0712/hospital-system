const path = require("path");
const resolve = dir => path.join(__dirname, dir);

module.exports = {
    // 选项
    publicPath: "./", //  基本路径

    outputDir: "dist",//  构建时的输出目录

    assetsDir: "static",//  放置静态资源的目录

    indexPath: "index.html",//  html 的输出路径

    filenameHashing: true,//文件名哈希

    /*pages: { //用于多页配置，默认是 undefined
        index: {

            entry: 'src/index/main.js',// page 的入口文件

            template: 'public/index.html',// 模板文件

            filename: 'index.html',// 在 dist/index.html 的输出文件

            // 当使用页面 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Index Page',

            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        // 当使用只有入口的字符串格式时，
        // 模板文件默认是 `public/subpage.html`
        // 如果不存在，就回退到 `public/index.html`。
        // 输出文件默认是 `subpage.html`。
        // subpage: 'src/subpage/main.js'
    },*/

    lintOnSave: false, //  是否在保存的时候使用 `eslint-loader` 进行检查。


    runtimeCompiler: false,// 是否使用带有浏览器内编译器的完整构建版本
    //  babel-loader 默认会跳过 node_modules 依赖。
    transpileDependencies: [ /* string or regex */ ],

    productionSourceMap: true,//  是否为生产环境构建生成 source map？

    //  设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。
    crossorigin: "",

    //  在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)。
    integrity: false,

    //  调整内部的 webpack 配置
    configureWebpack: () => {}, //(Object | Function)
    chainWebpack: config => {
        // 修复HMR
        config.resolve.symlinks(true);
        // 修复Lazy loading routes  按需加载的问题，如果没有配置按需加载不需要写，会报错
        // config.plugin("html").tap(args => {
        //   args[0].chunksSortMode = "none";
        //   return args;
        // });
        //添加别名
        config.resolve.alias
            .set("@", resolve("src"))
            .set("assets", resolve("src/assets"))
            .set("components", resolve("src/components"))
            .set("page", resolve("src/page"));
    },

    // 配置 webpack-dev-server 行为。
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/cli-service.md#配置代理
        proxy: null, // string | Object
        before: app => {}
    },

    // CSS 相关选项
    css: {
        // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
        // 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
        extract: true,

        // 是否开启 CSS source map？
        sourceMap: false,

        // 为预处理器的 loader 传递自定义选项。比如传递给
        // Css-loader 时，使用 `{ Css: { ... } }`。
        loaderOptions: {
            css: {
                // 这里的选项会传递给 css-loader

                // test: /\.css$/,
                // loaders: ['style-loader', 'css-loader']
            },
            less: {
                // test: /\.less$/,
                // loaders: ['style-loader', 'css-loader', 'less-loader'],
                // include: path.resolve(__dirname, "../")
            },
            postcss: {
                // 这里的选项会传递给 postcss-loader
            }
        },
        // 为所有的 CSS 及其预处理文件开启 CSS Modules。
        // 这个选项不会影响 `*.vue` 文件。
        requireModuleExtension: true
    },

    // 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`
    // 在多核机器下会默认开启。
    parallel: require('os').cpus().length > 1,

    // PWA 插件的选项。
    // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli-plugin-pwa/README.md
    pwa: {},

    // 三方插件的选项
    pluginOptions: {
        // ...
    }
}