const path = require('path');

const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(src, 'index.tsx'),
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /.tsx?$/,
        exclude: '/node-modules/',
        use: 'ts-loader',
      },
      {
        test: /.html$/,
        loader: 'html-loader',
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  output: {
    filename: 'bundle.js',
    path: dist,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(src, 'index.html')
    }),
  ],
  devServer: {
    contentBase: dist,
    open: true,
    openPage: "index.html",
    host: "localhost",
    port: 3000,
  }
}
