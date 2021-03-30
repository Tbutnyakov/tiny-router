const webpack = require('webpack');
const path = require('path');
const { makeTinyWebpackRouter } = require('../../dist/webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const analyze = process.env.ANALYZE;

const dev = mode === 'development';

const alias = {
  '~': path.resolve(__dirname, 'src/'),
  'tiny-router': path.resolve(__dirname, '../../dist/'),
};
const extensions = [
  '.mjs',
  '.ts',
  '.js',
  '.json',
  '.css',
  '.jsx',
  '.tsx',
  '.html',
];

const { entries, definedRouterData } = makeTinyWebpackRouter();

const CLIENT_ENV = {
  'process.browser': true,
  'process.env.isDev': dev,
  'process.env.NODE_ENV': JSON.stringify(mode),
  ...definedRouterData,
};

const distFolder = path.resolve(__dirname, 'dist');

module.exports = {
  entry: { main: './src/client.tsx', ...entries },
  output: {
    filename: dev ? '[name].dev.js' : '[name].[chunkhash].js',
    path: distFolder,
    publicPath: '/',
  },
  target: 'web',
  resolve: { alias, extensions },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
      },
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        use: [
          dev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: { auto: true },
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
  devServer: {
    contentBase: distFolder,
    compress: true,
    port: 3003,
    hot: true,
    historyApiFallback: true,
  },
  mode,
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin(CLIENT_ENV),
    analyze && new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      filename: dev ? '[name].css' : '[name].[contenthash].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './**/*',
          to: distFolder,
          context: 'src/static',
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: './src/template.html',
    }),
  ].filter(Boolean),
  devtool: dev && 'inline-source-map',
};
