//@ts-ignore

const path = require('path');
const ArcGISPlugin = require('@arcgis/webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: [
      './src/css/index.scss',
      '@dojo/framework/shim/Promise',
      './src/js/index.tsx'
    ]
  },
  output: {
    filename: '[name].[chunkhash].js',
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {}
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: false }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      },
      {
        test: /\.css$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['url-loader']
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),

    new ArcGISPlugin({
      useDefaultAssetLoaders: false,
      features: {
        '3d': false
      }
    }),

    new HtmlWebPackPlugin({
      title: 'ArcGIS Template Application',
      template: './src/index.html',
      filename: './index.html',
      favicon: './src/assets/favicon.ico',
      chunksSortMode: 'none',
      inlineSource: '.(css)$'
    })
  ],
  resolve: {
    alias: {
      js: path.join(__dirname, 'src/js'),
      css: path.join(__dirname, 'src/css'),
      images: path.join(__dirname, 'src/images')
    },
    modules: [
      path.resolve(__dirname, '/src'),
      path.resolve(__dirname, 'node_modules/')
    ],
    extensions: ['.ts', '.tsx', '.js', '.scss', '.css']
  },
  node: {
    process: false,
    global: false,
    fs: 'empty'
  }
};
