// const path = require('path')

// vue.config.js
module.exports = {
    chainWebpack: config => {
        config.module
            .rule('md')
            .test(/\.md$/)
            .use('html-loader')
            .loader('html-loader')
            .end()

            .use('markdown-loader')
            .loader('markdown-loader')
            .end()
        // .use('markdown-it-vue')
        // .loader('markdown-it-vue')
        // .end()

        // .use('mardown-it-footnote')
        // .loader('markdown-it-footnote')
        // .end()
    },
    outputDir: process.env.OUTPUT_DIR,
}
