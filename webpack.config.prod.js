import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import Dotenv from 'dotenv-webpack';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
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
    new Dotenv(),
    new webpack.DefinePlugin(GLOBALS),
    new ExtractTextPlugin('styles.css'),
    new UglifyJsPlugin() 
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
