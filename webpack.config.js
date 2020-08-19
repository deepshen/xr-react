const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const tsImportPluginFactory = require('ts-import-plugin')

const {merge} = require('webpack-merge')

const prod = require('./config/webpack.build.config')
const dev = require('./config/webpack.dev.config')

const env = process.env.NODE_ENV

let mergeConfig = dev
if(env === 'pro'){
  mergeConfig = prod
}

module.exports = merge(mergeConfig,
  {
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            getCustomTransformers: () => ({
              before:[tsImportPluginFactory({
                libraryName: 'antd',
                libraryDirectory: 'lib',
                style: 'css',
              })],
            }),
            compilerOptions:{
              module: 'es2015',
            },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.less$/,
          use: [
            'style-loader',
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
              },
            },
            'less-loader',
          ],
        },
        {
          test: /\.md$/,
          use: 'raw-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.js','.jsx','.ts','.tsx'],
      alias: {
        '@/components': path.resolve(__dirname,'./src/components'),
        '@/utils': path.resolve(__dirname,'./src/utils'),
        '@/localCom': path.resolve(__dirname,'./src/localCom'),
      },
    },
    plugins: [
      new CleanWebpackPlugin(),
    ],
  }
)

