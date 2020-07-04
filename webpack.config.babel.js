import {DefinePlugin, ExternalsPlugin} from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';

import path from 'path';

const envMode = process.env.NODE_ENV;
const distPath = path.join(__dirname, 'dist/');

const config = {
  entry: path.join(__dirname, './src/index.tsx'),
  output: {
    path: distPath,
    filename: 'bundle.js',
    chunkFilename: 'bundle.[id].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        use: {
          loader: 'babel-loader',
          query: {
            plugins: ['lodash']
          }
        }
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader:
              envMode === 'development'
                ? 'style-loader'
                : MiniCssExtractPlugin.loader
          },
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(envMode),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(
        __dirname,
        'src/index.html'
      ),
      filename: 'index.html',
      inject: 'body'
    }),
    new MiniCssExtractPlugin(),
    new LodashModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
  },
  optimization: {
    noEmitOnErrors: true
  },
  devServer: {
    contentBase: distPath,
    hot: true,
    historyApiFallback: true,
    writeToDisk: true,
    port: 8080
  },
  mode: envMode,
  devtool: 'source-map'
};

if (process.env.ANALYIZE) {
  config.plugins.push(
    new BundleAnalyzerPlugin({
      openAnalyzer: true,
      generateStatsFile: true,
      analyzerMode: 'static'
    })
  );
}

export default config;