const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN; // defined in CI/CD pipeline

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js', // naming convention for all built files
    // publicPath prefix this to the url for the main.js request
    // when deployed on aws, main.js is located in this directory
    // otherwise the request for main would go to '[cloudfronturl].com/main.js'
    // script tag in public html file will now call '[cloudfronturl].com/container/latest'
    publicPath: '/container/latest/'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container', // not req for host module but recommended
      remotes: {
        marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`
      },
      // passing all project dep to other apps
      // prevents apps from being loaded as one js file containing all dep
      // results in more network requests for each dep but thats still faster than one large req
      // removing shared would result in one large vendor bundle with dep
      shared: packageJson.dependencies
    })
  ]
};

module.exports = merge(commonConfig, prodConfig);
