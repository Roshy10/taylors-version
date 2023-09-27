# Taylor's Version

Taylor Swift denotes her rerecorded songs by appending (Taylor's Version) to each of the original titles. However, manually switching each of the old recordings out of a playlist is a very tedious task. To mitigate this issue, Taylor's Version is a React app that scans your Spotify playlists and automatically replaces the old recordings of Taylor Swift songs to the rerecorded version.

![](images/playlist%20before%20and%20after.png)

To use this app, visit the hosted version at https://taylors-version.com. You may also install and run the project yourself.

## Prerequisites
- Install [Node.js/npm](https://nodejs.org/en). 

It is recommended to use Node.js v16 or lower. If you use v17+, please refer to the note in Installation to see how to fix an error you may encounter.

## Installation

1. Visit [Spotify developer dashboard](https://developer.spotify.com/) and create an application.
2. Set the Redirect URI to `http://localhost:9000/spotify`. You will need the client ID for your app later.
3. Download the project: `git clone git@github.com:Roshy10/taylors-version.git`.
4. Go to the webpack.common.js file.
   * Set `externals.config.appUrl` to `http://localhost:9000`.
   * Set `externals.config.clientId` to the client ID you generated earlier.
   * Or, if you use an IDE like Webstorm, you can set the environment variables yourself in your run configuration.
5. Run `npm install` in both the root directory and the cdk directory.
6. Run `npm start` in the root directory.
7. Visit `http://localhost:9000` to see the application.

**Note:** If you are receiving an ERR_OSSL_EVP_UNSUPPORTED error after step 6, check your Node.js version. Node.js v17+ throws this error to prevent the use of a feature that was removed from OpenSSL for security reasons. 

There are 2 ways to fix this error:

1. Downgrade to Node.js v16.
2. Use the `--openssl-legacy-provider` option*.
   * On Unix-like systems (Linux, macOS, etc.): 
      ```
      export NODE_OPTIONS=--openssl-legacy-provider
      ```
   * On Windows Command Prompt: 
      ```
      set NODE_OPTIONS=--openssl-legacy-provider
      ```
   * On Windows Powershell: 
      ```
      $env:NODE_OPTIONS = "--openssl-legacy-provider"
      ```

*This option is not recommended as it leaves the application vulnerable to security threats.

## Contributing

Contributions towards this project are welcome. Feel free to raise issues or have a look at the issues page. To contribute, please follow these steps:

1. Fork the repository.
2. Make your changes while following standard naming conventions for JavaScript. These include:
   * Variable and function names should be camelCase.
   * User-defined JSX components should be PascalCase.
   * Opening curly bracket should be at the end of the first line.
3. Submit a pull request to `develop` on the main repository.

## Credits
<a href="https://github.com/Roshy10/taylors-version/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Roshy10/taylors-version" />
</a>

## License
Taylor's Version is licensed under a [GNU General Public License v3.0](https://github.com/Roshy10/taylors-version/blob/develop/LICENSE).
