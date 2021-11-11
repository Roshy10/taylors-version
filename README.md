# Taylor's Version

This is a React app which allows you to automatically replace Taylor Swift songs in your Spotify playlists with the (
Taylor's Version).

The recommended way of using this is to visit the hosted version at https://taylors-version.com however if you wish to
run it yourself you're welcome to.

## Contributing

Contributions towards this project are welcome, please feel free to raise issues, or have a look at the issue page for
ideas for making pull requests.

## Running it yourself

1. Visit the Spotify developer dashboard and create an application and set the callback url
   to `http://localhost:9000/spotify`, you'll need the client ID for your app later.
2. Download the project: `git clone git@github.com:Roshy10/taylors-version.git`
3. Go to webpack.common.js and set `externals.config.appUrl` to `http://localhost:9000` and `externals.config.clientId`
   to the one you generated earlier (or if you use an IDE like Webstorm, you can set the environment variables yourself
   in your run configuration)
4. run `npm install`
5. run `npm start`
6. visit `http://localhost:9000` and it should be running
