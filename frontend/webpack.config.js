'use strict'

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' })
  ],
  devServer: {
    host: process.env.DEV_SERVER_HOST || 'localhost',
    port: 8080,
    open: true,
    historyApiFallback: true,
    allowedHosts: 'all',
    // Proxy backend calls to the Express API so the client can request
    // `/files/*` directly (no CORS / hard-coded host needed in the app code).
    proxy: {
      '/files': process.env.API_PROXY_TARGET || 'http://localhost:3000'
    }
  }
}
