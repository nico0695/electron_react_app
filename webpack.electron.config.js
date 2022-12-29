const path = require('path');

const nodeExternals = require("webpack-node-externals");

module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devtool: 'source-map',
  entry: './src/api/config/main.ts',
  target: 'electron-main',
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.json',
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  ignoreWarnings: [
    {
      module: /node_modules/, // A RegExp
    },
    (warning) => true,
  ],
  // externals: {
  //   sqlite3: 'commonjs sqlite3',
  //   typeorm: 'commonjs typeorm',
  // },
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    library: {
      type: 'umd',
    },
  },
};