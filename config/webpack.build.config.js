const entries = require('../entry')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    indexEntry: path.resolve(__dirname,'..','src/index.tsx'),
    ...entries,
  },
  output: {
    filename: chunkData => {
      if(chunkData.chunk.name === 'indexEntry'){
        return 'index.js'
      }
      return chunkData.chunk.name === 'index'?'lib/[name].js':'lib/components/[name]/index.js'
    },
    path: path.resolve(__dirname,'..','build'),
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,'..','src/index.html'),
      chunks: ['indexEntry'],
    })
  ],
}
