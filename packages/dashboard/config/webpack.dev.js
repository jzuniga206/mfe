const { merge } = require('webpack-merge'); // to combine webpack config objects
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  output: {
    // points to where to find the main.js file for auth in development
    publicPath: 'http://localhost:8083/',
  },
  devServer: {
    port: 8083,
    historyApiFallback: {
      index: '/index.html',
    },
    headers: {
      'Access-Control-Allow-Origin': '*', // bc we're loading font files from outside source
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      // used to delcare a global variable - used by container to reference this apps remoteEntry
      name: 'dashboard',
      filename: 'remoteEntry.js',
      exposes: {
        './DashboardApp': './src/bootstrap',
      },
      // shared: ['react', 'react-dom']
      shared: packageJson.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

// devConfig being listed second will override and configs mentioned in both common and dev configs
module.exports = merge(commonConfig, devConfig);
