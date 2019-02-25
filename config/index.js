// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8888,
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/product': {
        // target: 'http://10.0.0.164:8085',
       //target:' http://192.168.1.140:8085',
        target: 'http://192.168.1.119:8085',
         //target: 'http://192.168.11.30:8085',
        changeOrigin: true,
        pathRewrite: {
          '^/product': '/product'
        }
      },
      '/finance': {
        target: 'http://10.0.0.167:8086',
        //target:' http://192.168.1.137:8086',
       // target: 'http://192.168.1.119:8086',
        //target:' http://192.168.11.32:8085',
        changeOrigin: true,
        pathRewrite: {
          '^/finance': '/finance'
        }
      },
      '/org': {
        //target: 'http://192.168.1.178:8087',
        target: 'http://10.0.0.167:8087',
        //target: 'http://192.168.1.119:8087',
        changeOrigin: true,
        pathRewrite: {
          '^/org': '/org'
        }
      },

      '/collect': {
        target: 'http://10.0.0.164:8082',
        //target: 'http://192.168.1.178:8082',
        changeOrigin: true,
        pathRewrite: {
          '^/collect': '/collect'
        }
      },
      '/auth': {
        target: 'http://10.0.0.164:8080',
        //target: 'http://192.168.1.137:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/auth': '/auth'
        }
      },
      '/customer': {
       // target: 'http://192.168.1.177:8081',
        //target: 'http://192.168.1.137:8081',
        target: 'http://10.0.0.164:8081',
        changeOrigin: true,
        pathRewrite: {
          '^/customer': '/customer'
        }
      },
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
