// config that is going to be used in both dev and prod

module.exports = {
  module: {
    rules: [
      // define loader - tells webpack to process certain files
      {
        test: /\.m?js$/, // any .mjs or .js files should be processed by babel
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  }
};