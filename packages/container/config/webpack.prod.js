const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN; // defined in CI/CD pipeline

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js' // naming convention for all built files
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container', // not req for host module but recommended
      remotes: {
        marketing: `marketing@${domain}/marketing/remoteEntry.js`
      },
      shared: packageJson.dependencies
    })
  ]
};

module.exports = merge(commonConfig, prodConfig);
