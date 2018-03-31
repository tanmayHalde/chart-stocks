import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  'process.env.API_KEY': JSON.stringify('-ar_PDsmkJwNtrQNLqsn'),
};

export default {
  devtool: 'source-map',
  entry: './src/index',
  target: 'web',
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),    // allows to create global constants
    new ExtractTextPlugin('styles.css'),  // extracts the css file into a seperate file
    new webpack.optimize.UglifyJsPlugin() // minification 
  ],
  module: {
    rules: [  
      {test: /\.js$/, include: path.join(__dirname, 'src'), loader: 'babel-loader'},
      {test: /(\.scss)$/, 
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {loader: ("css-loader"), options: {sourceMap: true}},
            {loader: ("sass-loader"), options: {sourceMap: true}}
          ]
        })
      },
      {test: /\.(woff|woff2)$/, loader: "url-loader?prefix=font/&limit=5000"},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream"},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml"},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"},
      {test: /\.(gif|svg|jpg|png)$/, loader: "url-loader?limit=100000"}
    ],
  }
};
