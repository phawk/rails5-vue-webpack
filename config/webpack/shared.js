// Note: You must restart bin/webpack-watcher for changes to take effect

var path = require('path')
var glob = require('glob')
var extname = require('path-complete-extname')
var webpack = require('webpack')

module.exports = {
  entry: glob.sync(path.join('..', 'app', 'javascript', 'packs', '*.js*')).reduce(
    function(map, entry) {
      var basename = path.basename(entry, extname(entry))
      map[basename] = entry
      return map
    }, {
      vendor: ['vue', 'axios']
    }
  ),

  output: { filename: '[name].js', path: path.resolve('..', 'public', 'packs') },

  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader?{"cacheDirectory":true,"presets":[["es2015",{"modules":false}]]}',
            css: 'vue-style-loader!css-loader!sass-loader?sourceMap'
          },
          postcss: [require('autoprefixer')],
        }
      },
      { test: /\.html$/, loader: 'vue-html-loader' },
      { test: /\.coffee(.erb)?$/, loader: "coffee-loader" },
      {
        test: /\.js(.erb)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [ 'latest', { 'es2015': { 'modules': false } } ]
          ]
        }
      },
      {
        test: /.erb$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'rails-erb-loader',
        options: {
          runner: 'DISABLE_SPRING=1 ../bin/rails runner'
        }
      },
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    }),
  ],

  resolve: {
    extensions: [ '.js', '.coffee', '.html' ],
    modules: [
      path.resolve('../app/javascript'),
      path.resolve('../vendor/node_modules')
    ],
    alias: {
      'components': path.resolve(__dirname, '../../app/javascript/components'),
      'helpers': path.resolve(__dirname, '../../app/javascript/helpers'),
      'vue$': 'vue/dist/vue.common.js',
    }
  },

  resolveLoader: {
    modules: [ path.resolve('../vendor/node_modules') ]
  }
}
