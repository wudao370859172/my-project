const path = require('path');
const webpack = require('webpack')
//  清除上次打包的残留文件
const CleanWebpackPlugin = require('clean-webpack-plugin')
var { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var packagejson = require('./package.json')

const cleanPath = [
  'dist'
]

const cwd = process.cwd();

module.exports = {
  mode: 'development',
  entry: {
    home: [
      path.resolve(__dirname, 'app/index.jsx'),
      // 'webpack-hot-middleware/client?reload=true,path=/__webpack_hmr'
    ]
  },
  output: {
    publicPath: '/', //线上的路径
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.[hash].js'
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './dist',
    publicPath: '/',
    compress: true,
    hot: true,
    port: 3000,
    proxy: {
      'remote': {
        target: 'localhost:8081',
        pathRewrite: { '^/remote': '' }
      }
    }
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.js[x]?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-syntax-dynamic-import']
          },
        }
      },
      {
        test: /\.(jpeg|jpg|png)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192
          },
        }]
      }]
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        react: {
          test: /react/, // 直接使用 test 来做路径匹配
          chunks: 'initial',
          //  使用名字会被限制只有一个包，不能分组成各个维度的公共包
          // name: 'common-react',
          enforce: true,
          minChunks: 2,
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          // name: 'vendors',
          priority: -20,
          chunks: 'all'
        }
      }
    }
  },

  //     
  // }
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(cleanPath),
    new HtmlWebpackPlugin({  // Also generate a test.html
      filename: 'index.html',
      template: './templates/index.html'
    }),
    // new BundleAnalyzerPlugin({ analyzerPort: 3000 }),
    new UglifyJsPlugin({
      test: /\.js($|\?)/i
    }),

    // new webpack.DllReferencePlugin({
    //   context: __dirname,
    //   manifest: require('./manifest.json'),
    // }),

    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/style.css',
      chunkFilename: '[id].css'
    }),
    new webpack.LoaderOptionsPlugin({
      // test: /\.xxx$/, // may apply this only for some modules
      options: {

      }
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.less', '.scss', '.css'], //后缀名自动补全
    //  配置路径别名
    alias:  {
      '@root': cwd,
      '@pages': path.join(cwd, 'app', 'pages'),
      '@routes': path.join(cwd, 'app', 'routes'),
      '@components': path.join(cwd, 'app', 'components'),
    }
  }

};