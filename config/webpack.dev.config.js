const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname,'..', 'src/index.tsx'),
  output: {
    filename: "index.js",
    path: path.resolve(__dirname,'..','dist'),
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,'..', 'src/index.html'),
    }),
  ],
}
