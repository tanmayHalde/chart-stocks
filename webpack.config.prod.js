import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import dotenv from 'dotenv';
dotenv.config();

// for local server
// process.env.PORT = 3000;

// webpack experimental plugins
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';


const GLOBALS = {
  'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
  'process.env.NODE_ENV': JSON.stringify('production'),
  'process.env.PORT': JSON.stringify(process.env.PORT)
};

export default {
  devtool: 'cheap-source-map',
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
    new webpack.DefinePlugin(GLOBALS),
    new ExtractTextPlugin('styles.css'),
    new UglifyJsPlugin({
      cache: true,
      parallel: true
    }),
    // new BundleAnalyzerPlugin()
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
