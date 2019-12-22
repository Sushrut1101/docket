const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
}

const GH_URL = process.env.GH_URL

module.exports = {
  entry: {
    main: path.join(PATHS.src, 'index.js'),
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: PATHS.src + '/index.ejs',
      title: 'Docket',
    }),
    new webpack.DefinePlugin({
      GH_URL: JSON.stringify(GH_URL),
    }),
  ],

  resolve: {
    extensions: ['.js'],
    alias: {
      react: path.resolve('./node_modules/react'),
    },
  },

  module: {
    rules: [
      {
        test: [/\.js$/],
        exclude: [/node_modules/, /\.story.js$/, /\.test.js$/],
        loader: 'babel-loader',
      },
    ],
  },

  devServer: {
    historyApiFallback: true,
  },

  output: {
    path: PATHS.dist,
  },
}
