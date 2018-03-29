import webpack from 'webpack';
import path from 'path';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('development'),
  'process.env.API_KEY': JSON.stringify('-ar_PDsmkJwNtrQNLqsn')
};

export default {
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './src/index.js'
  ],
  target: 'web',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    contentBase: './src',
    hot: true,
    inline: true,
    historyApiFallback: true  // loads index page on any 404 
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    rules: [  
      {test: /\.js$/, include: path.join(__dirname, 'src'), loader: 'babel-loader'},
      {test: /(\.scss)$/, 
        use: [
          {loader: 'style-loader'}, 
          {loader: 'css-loader'},
          {loader: 'sass-loader'},
        ],
      },
      {test: /\.(woff|woff2)$/, loader: "url-loader?prefix=font/&limit=5000"},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream"},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml"},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"}
    ],
  }
};