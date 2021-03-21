const { merge } = require('webpack-merge'); // to combine webpack config objects
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  output: {
    // points to where to find the main.js file for container in development
    publicPath: 'http://localhost:8080/',
  },
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: '/index.html',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container', // name for host not really used for anything
      remotes: {
        // 'marketing' in value string must match the name in the target app's ModuleFederationPlugin config
        marketing: 'marketing@http://localhost:8081/remoteEntry.js',
        auth: 'auth@http://localhost:8082/remoteEntry.js',
      },
      // shared: ['react', 'react-dom']
      shared: packageJson.dependencies,
      // lists all proj dependencies are shared across all apps
      // prevents from having to specify shared dep in the array above for each change
    }),
  ],
};

// devConfig being listed second will override and configs mentioned in both common and dev configs
module.exports = merge(commonConfig, devConfig);
