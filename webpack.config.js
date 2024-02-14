const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
var ImageminPlugin = require('imagemin-webpack-plugin').default





let mode = 'development'; 
let target = 'web'; 
if (process.env.NODE_ENV === 'production') { // Режим production, если 
  // при запуске вебпака было указано --mode=production
  mode = 'production';
  target = 'browserslist'; // в продакшен режиме используем browserslist

}

  
const plugins = [
  new HtmlWebpackPlugin({
    template: "./public/index.html"
, // Данный html будет использован как шаблон
  }),
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css', // Формат имени файла
  }), 
  new webpack.LoaderOptionsPlugin({
    test: /\.xxx$/, // may apply this only for some modules
    options: {
      customConfig: {
        stats: {
        errorDetails: true,
        children: true
      }
     },
    }
  }),
  new CleanWebpackPlugin(),  
  new webpack.HotModuleReplacementPlugin(),
  new webpack.ProvidePlugin({
    "React": "react",
  }),
  new webpack.DefinePlugin({
    process: {env: {}}
  }),
  new BundleAnalyzerPlugin(),
  new ImageminPlugin({ test: 'images/**' }),
]; 

if (process.env.NODE_ENV === 'development') {
  plugins.push('react-refresh/babel');
} 

if (process.env.SERVE) { // Используем плагин только если запускаем devServer
  plugins.push(new ReactRefreshWebpackPlugin());
} // Данный код должен быть размещен после объявления массива plugins


module.exports = {
  cache: {
    type: 'filesystem',
  },
  mode,
  target,
  plugins,
  entry: './src/index.js',  
  devtool: 'source-map',   
  resolve: {
    extensions: ['.js', '.jsx', 'json'],
    modules: ['bower_components', 'node_modules', path.resolve('./src')],    
    fallback: {
      'process/browser': require.resolve('process/browser'),
    },
    alias: {
      "react/jsx-dev-runtime.js": "react/jsx-dev-runtime",
      "react/jsx-runtime.js": "react/jsx-runtime",
    },
  },  
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: '[path][name][ext][query]',
    publicPath: '/',
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        default: {
          name:'common',
          minSize: 0, // Too small public files are not necessary to split, here to make a demonstration filled 0
          minChunks: 2,// Minimum number of references
          priority: -20 // Determine the priority order of the block
        },
        vendor: {
          name:'vendor',
          test: /node_modules/,
          priority: -10
        }
      }
    },

    minimizer: [
      new CssMinimizerPlugin(), new TerserPlugin({
        terserOptions: {
          compress: {drop_console: true,}
        },
      })      
    ],
  },  
  devServer: {  
    port: 8080, 
    contentBase: path.resolve(__dirname, './src'),    
    hot: true,      
    open: true,  
    liveReload: true,
  },

  externals: {
    'react/lib/ReactContext': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/addons': true,    
    'react': 'React'
  },

  
  module: {	
    rules: [       
      { test: /\.js$/, exclude: /node_modules/, use: { loader: 'babel-loader', options: {cacheCompression: false,cacheDirectory: true }}, resolve: {fullySpecified: false }},
      { test: /\.jsx$/, exclude: /node_modules/,   use: { loader: 'babel-loader', options: { cacheDirectory: true}}},
      { test: /\.(html)$/, use: ['html-loader'] },
      { test: /\.(s[ac]|c)ss$/i, use: [ MiniCssExtractPlugin.loader,'css-loader', 'postcss-loader','sass-loader']}, 
      { test: /\.(jpe?g|png|gif|svg|webp)$/i, use: [
        {loader: 'file-loader', options: {name: '[path][name].[ext]',}},
        {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 80,
            },
            // optipng.enabled: false will disable optipng
            optipng: {
              enabled: false,
             
            },
            pngquant: {
              quality: [0.65, 0.65],
              speed: 4
            },
            gifsicle: {
              interlaced: false,
            },
            // the webp option will enable WEBP
            webp: {
              quality: 75
            }
          }
        },
    
      ]},      
      { test: /\.(woff2?|eot|ttf|otf)$/i, type: 'asset/resource'},
      { test: /\.json$/, exclude: /node_modules/, type: 'asset/resource'},
      { test: /\.(csv|tsv)$/i, use: ['csv-loader']},
      { test: /\.xml$/i, use: ['xml-loader']},      
    ],     
  }
};




 