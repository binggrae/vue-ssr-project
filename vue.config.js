const path = require("path");

module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],
    chainWebpack: config => {
        config.resolve.alias.set('@', path.resolve(__dirname, 'src'));
    },
    pluginOptions: {
        ssr: {
            defaultTitle: 'test',
            favicon: './public/favicon.ico',
            nodeExternalsWhitelist: [/\.css$/, /\?vue&type=style/, /^vuetify/, /^register-service-worker/],
        }
    },

    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "@/assets/style/common/vars.scss";`
            }
        }
    }

};
