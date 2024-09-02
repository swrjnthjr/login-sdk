const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode:"production",
  entry: './src/LoginPage.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'LoginPage.js',
    library: 'SDKLoginPage',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  externals: [nodeExternals(),
    {
      'react': 'react',
      'react-dom': 'react-dom'
    }],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  }
};
