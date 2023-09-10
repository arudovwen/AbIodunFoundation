const path = require("path")
import { theme } from './src/config/theme/themeVariables';
module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production'
      ? process.env.VUE_APP_SUB_ROUTE
        ? process.env.VUE_APP_SUB_ROUTE
        : process.env.BASE_URL
      : process.env.BASE_URL,
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            ...theme,
          },
          javascriptEnabled: true,
        },
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'), // Alias for the 'src' directory 
        'components': path.resolve(__dirname, 'src/components'),
        'views': path.resolve(__dirname, 'src/views'),
        'api': path.resolve(__dirname, 'src/api'),
      },
    },
  },
};
