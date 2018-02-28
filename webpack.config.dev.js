import webpack from 'webpack';
import path from 'path';

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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    rules: [  
      {test: /\.js$/, include: path.join(__dirname, 'src'), loader: 'babel-loader'},
      {test: /(\.css)$/, use: [{loader: 'style-loader'}, {loader: 'css-loader'}]},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"}
    ],
  }
};