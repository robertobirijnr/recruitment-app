let publicPath = process.env.NODE_ENV === 'production' ? 'recruitment-app/' : '/';

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