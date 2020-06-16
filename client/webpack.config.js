const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = !isDevelopment;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };

  if (isProduction) {
    config.minimize = true;
    config.minimizer = [new OptimizeCssAssetsPlugin(), new TerserPlugin()];
  }

  return config;
};

const filename = (extension = '') =>
  isDevelopment ? `[name].${extension}` : `[name][hash].${extension}`;

const cssLoaders = (preprocessor = '') => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDevelopment,
        reloadAll: true,
      },
    },
    'css-loader',
  ];

  if (preprocessor) {
    loaders.push(preprocessor);
  }
  return loaders;
};

module.exports = {
  devServer: {
    historyApiFallback: true,
    hot: isDevelopment,
    port: 3000,
    proxy: {
      '/api': {
        changeOrigin: true,
        target: 'http://localhost:5000',
      },
    },
    publicPath: '/',
  },

  devtool: isDevelopment ? 'source-map' : '',

  entry: {
    main: ['@babel/polyfill', './src/index.js'],
  },

  mode: 'development',

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: cssLoaders(),
      },
      {
        test: /\.s[ac]ss$/i,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/i,
        use: ['file-loader'],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/i,
        use: ['file-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },

  optimization: optimization(),

  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  plugins: [
    new CleanWebpackPlugin(),

    // TODO Copy assets
    // new CopyWebpackPlugin([
    //   {
    //     from: 'public/favicon.ico',
    //     to: 'dist/',
    //   },
    // ]),

    new HTMLWebpackPlugin({
      filename: './index.html',
      minify: {
        collapseWhitespace: isProduction,
        removeComments: isProduction,
      },
      template: './public/index.html',
    }),

    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.jsx', '.scss'],
  },

  watchOptions: {
    poll: 500,
    ignored: ['node_modules/**', 'dist/**'],
  },
};
