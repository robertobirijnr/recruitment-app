let publicPath = process.env.NODE_ENV === 'production' ? 'sing-app-vue-dashboard/' : '/';

module.exports = {
  chainWebpack: config => {
    config.performance
      .maxEntrypointSize(400000)
      .maxAssetSize(400000)
  },
  publicPath,
  productionSourceMap: false,
};