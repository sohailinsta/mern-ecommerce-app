const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/components/CheckoutSuccess.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'CheckoutSuccess.js',
  },
  module: {
    rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
          },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
