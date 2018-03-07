import path from 'path';
import * as d3 from 'd3';

export default {
  debug: true,
  devtool: 'inline-source-map',
  noInfo: false,
  entry: [
    path.resolve(__dirname, 'src/index')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loaders: ['style','css']},
      {test: /\.csv$/, loaders: ['dsv']},
      {test: /\.json$/, loaders: ['json']},
      {test: /\.(png|jpg|gif)$/, loaders: ['file']}
    ]
  },
  target: "webworker", // or 'node' or 'node-webkit'
  externals:{
      fs:    "commonjs fs",
      path:  "commonjs path"
  }
}
