let publicPath = process.env.NODE_ENV === 'production' ? 'sing-app-vue-dashboard/' : '/';

module.exports = {
  configureWebpack: {
    performance: {
      hints: false
    },
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      }
    }
  },
  publicPath,
  productionSourceMap: false,
};