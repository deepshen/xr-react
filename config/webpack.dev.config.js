const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname,'..', 'src/index.tsx'),
  output: {
    filename: "index.js",
    path: path.resolve(__dirname,'..','dist'),
    publicPath: "/",
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '..', 'dist'),
    port: 3010,
    hot: true,
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,'..', 'src/index.html'),
    }),
  ],
}
