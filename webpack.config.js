const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const clientConfig = {
  entry: {
    "main.ts": "./src/client/index.ts"
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, "dist/public"),
    filename: 'main.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts|js)?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.pug$/,
        use: [
          'pug-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg|html)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/client/public/index.pug',
      inject: true,
      hash: true
    })
  ]
};

const serverConfig = {
  entry: './src/server/index.ts',
  target: 'node',
  externals: [nodeExternals()], // This will exclude node_modules from output
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts|js)?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist/server')
  }
};

module.exports = [
  clientConfig,
  serverConfig
];
