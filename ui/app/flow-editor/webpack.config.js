const path = require("path");
const dist = path.resolve(__dirname, "dist");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");

module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  watch: true,
  module: {
    rules: [
      // {
      //   test: /\.tsx?$/,
      //   loader: "ts-loader",
      //   exclude: /node_modules/,
      //   options: {
      //     configFile: "tsconfig.json"
      //   }
      // },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre",
        exclude: [
          /node_modules/
        ]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader',],
      },
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  watchOptions: {
    ignored: ['**/*.ts', 'node_modules']
  },
  output: {
    filename: "bundle.js",
    path: dist
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Flow Editor",
      filename: "index.html",
      template: "src/index.html",
      alwaysWriteToDisk: true,
      minify: false
    }),
    new HtmlWebpackHarddiskPlugin({
      outputPath: path.resolve(__dirname, "dist")
    })
  ]
};
