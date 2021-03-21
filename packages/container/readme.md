# Container

### Responsibilities
- renders all other apps
- communicates with all other apps to synchronize things like browser history, user information
  - communication occurs through each apps exported mount function that can accept an optional configuration object argument
  - every app having its own mount allows it to determine how it will be mounted to the DOM (using React, Vue, etc)
    - `/dashboard` is built using vue
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
      }),
    ]```
    
- define the dependencies that can be shared between apps
  - without defining a shared array of dependencies, all dependencies will be re-downloaded between each app
  - every app will define its own shared dependencies and can specify if it requires specific versions
  - sharing all dependencies by referencing package.json deps could cause issues when breaking changes occur on updates

```
  /// container webpack config
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      ...,
      // react and react-dom can be shared between other apps with matching dep
      // instead of an array, the dependencies prop from package.json can be used
      // this will just share all deps
      shared: ['react', 'react-dom', ...]
    })
  ]
```
