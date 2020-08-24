/*eslint-disable*/
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const WebpackBar = require('webpackbar')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const { merge } = require('webpack-merge');

const prod = require('./config/webpack.build.config');
const dev = require('./config/webpack.dev.config');

const env = process.env.NODE_ENV;

let mergeConfig = dev;
if (env === 'pro') {
  mergeConfig = prod;
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
              before: [tsImportPluginFactory({
                libraryName: 'antd',
                libraryDirectory: 'lib',
                style: 'css',
              })],
            }),
            compilerOptions: {
              module: 'es2015',
            },
          },
          exclude: /node_modules/,
          include: /src/,
        },
        {
          test: /\.(c|le)ss$/,
          use:  [
            env==='dev'? 'style-loader':MiniCssExtractPlugin.loader,
            'css-loader',
            'less-loader'
            ],
        },
        {
          test: /\.md$/,
          use: 'raw-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        '@/components': path.resolve(__dirname, './src/components'),
        '@/utils': path.resolve(__dirname, './src/utils'),
        '@/localCom': path.resolve(__dirname, './src/localCom'),
        '@/config': path.resolve(__dirname, './src/config'),
        '@/view': path.resolve(__dirname, './src/view')
      },
    },
    plugins: [
      new CleanWebpackPlugin(),
      new WebpackBar(),
    ],
  });
