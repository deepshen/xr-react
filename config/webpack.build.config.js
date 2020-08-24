const entries = require('../entry')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssPlugin = require('mini-css-extract-plugin') // 提取css
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer') // 查看各个依赖包的大小
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

module.exports = {
  mode: "production",
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
    path: path.resolve(__dirname,'..','docs'),
    libraryTarget: "umd",
  },
  devtool: false,
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,'..','src/index.html'),
      chunks: ['indexEntry'],
    }),
    new MiniCssPlugin({
      filename: 'lib/css/[name].css',
      chunkFilename: '[id].css'
    }),
    new LodashModuleReplacementPlugin(),
    // new BundleAnalyzerPlugin(), 查看各模块依赖大小
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor:{
          chunks: "all",
          test: /[\\/]node_modules[\\/]/,
          priority: 2,
        }
      },
    },
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          discardComments: { removeAll: true } // 移除注释
        }
      }),
      new UglifyJsPlugin({
        parallel: true,  //使用多进程并行运行来提高构建速度
        sourceMap: false,
        uglifyOptions: {
          warnings: false,
          compress: {
            unused: true,
            drop_debugger: true,
            drop_console: true,
          },
          output: {
            comments: false // 去掉注释
          }
        }
      })
    ],
  },
  externals:{
    // 依赖外部 或cdn加入
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDOM'
    },
    'classnames':'classnames'
  }
}
