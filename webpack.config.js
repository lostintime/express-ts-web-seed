const path = require('path');

const clientConfig = {
  entry: './src/client/index.ts',
  target: 'web',
  output: {
    path: path.resolve(__dirname, "dist/public/assets"),
    filename: 'main.js',
    publicPath: '/assets/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg|html)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
};

const serverConfig = {
  entry: './src/server/index.ts',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.(tsx|ts|js)?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist/server')
  }
};

module.exports = [clientConfig, serverConfig];
