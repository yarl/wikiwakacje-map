var path = require('path');
var webpack = require('webpack');

var config = {
  context: path.join(__dirname, "app"),
  entry: './index.js',
  output: {
    path: path.join(__dirname, "app"),
    filename: 'bundle.js'
  },
  plugins: [],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'ng-annotate',
      },
      {
        test: /\.html?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'raw'
      },
      {
        test: /\.css$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'style!css'
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'style!css!sass'
      }
    ]
  }
};

if(process.env.NODE_ENV === "production") {
  config.output.path = path.join(__dirname, "dist");
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;
