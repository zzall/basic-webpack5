const { resolve } = require('path');
const toml = require('toml')
const yaml = require('yamljs')
const json5 = require('json5')
// const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name][contenthash:10].js',
    path: resolve(__dirname, 'build'),
    clean: true,
  },
  devtool: 'inline-source-map',
  devServer: {
    static: resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(csv|tsv)$/,
        use: ['csv-loader']
      },
      {
        test: /\.xml$/,
        use: ['xml-loader']
      },
      {
        test: /\.toml$/,
        type: 'json',
        parser: {
          parse: toml.parse
        }
      },
      {
        test: /\.yaml$/,
        type: 'json',
        parser: {
          parse: yaml.parse
        }
      },
      {
        test: /\.json5$/,
        type: 'json',
        parser: {
          parse: json5.parse
        }
      },
      // 'transform-runtime' 插件告诉 Babel
      // 要引用 runtime 来代替注入。
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [[
              "@babel/preset-env",
              {
                modules: false,
                useBuiltIns: "usage",
                corejs: 3,
                targets: { chrome: "58", ie: "11" }
              }
            ]],
            // plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
      // {
      //   test: require.resolve('./src/index.js'),
      //   // 可以通过imports-loader来内置全局变量，其中wrapper可以指定引入包的全局作用域
      //   use: 'imports-loader?wrapper=window'
      // },
      // {
      //   test: require.resolve('./src/global.js'),
      //   // 可以通过exports-loader将匹配到的文件单独打到一个包中，并定义一下exports暴露出来的内容
      //   use: 'exports-loader?type=commonjs&exports=file,multiple|helpers.parse|parse'
      // },
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader']
      // },
      // {
      //   test: /\.less$/,
      //   use: ['style-loader', 'css-loader', 'less-loader']
      // },
      // {
      //   test:/\.js$/,
      //   use:[{
      //     loader:'eslint-loader',
      //   }]
      // },
      // {
      //   test:/\.js$/,
      //   use:[{
      //     loader:'babel-loader',
      //   }]
      // },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    // webpack模块分析
    // new BundleAnalyzerPlugin(),
    // 内置全局变量,前面还有通过imports-loader来内置个别包的全局变量
    // new webpack.ProvidePlugin({
    //   _: 'loadsh',
    //   $: 'jquery'
    // })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: 'single',
  },
  mode: 'production'
  // mode: 'development'
}