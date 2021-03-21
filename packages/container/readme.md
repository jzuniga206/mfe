# Container

### Responsibilities
- renders all other apps
- communicates with all other apps to synchronize things like browser history, user information
  - communication occurs through each apps exported mount function that can accept an optional configuration object argument
  - this config object contains functions necessary for handling the passing of information between container and apps

- Every micro app is rendered as a React component in `/src/components`
  - Every app exports a mount function which is exposed through webpack ModuleFederationPlugin config

    ```
    // marketing app example in marketing/config/webpack.dev.js
    plugins: [
      new ModuleFederationPlugin({
        // used to delcare a global variable - referenced by container to access remoteEntry.js
        name: 'marketing', 
        filename: 'remoteEntry.js',
        exposes: {
          './MarketingApp': './src/bootstrap',
        },
        // shared: ['react', 'react-dom']
        shared: packageJson.dependencies,
      }),
      ...
      ]
      
    // container app accessing marketing initialization in container/config.webpack.dev.js
    plugins: [
      new ModuleFederationPlugin({
        name: 'container', // name for container not used for anything
        remotes: {
          // localhost.. replaced with dynamic domain name during build (look at webpack.prod.js for example)
          // 'marketing' key must match 'name' key in marketing webpack config
          marketing: 'marketing@http://localhost:8081/remoteEntry.js',
        },
        shared: packageJson.dependencies,
      }),
    ]```
