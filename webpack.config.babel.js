import ExtractTextPlugin from 'extract-text-webpack-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

export default {
  entry: './src/js/index.js',
  output: {
    filename: './dist/js/script.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            'postcss-loader',
          ],
        }),
      },
      {
        test: /\.png$/,
        use: 'file-loader?name=../img/[name].[ext]',
      },
    ],
  },
  plugins: [
    new UglifyJSPlugin(),
    new ExtractTextPlugin({
      filename: './dist/css/style.css',
      disable: false,
      allChunks: true,
    }),
  ],
};
