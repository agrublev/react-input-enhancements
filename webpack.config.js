const path = require("path");
const webpack = require("webpack");
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  entry: [path.join(__dirname, "./src/index.js")],
  output: {
    path: __dirname + "/lib",
    filename: "index.js",
    libraryTarget: "umd",
    library: "@fkit/input"
  },
  externals: {
    react: "react",
    "react-dom": "react-dom"
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|dist)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  modules: false,
                  targets: {
                    node: "current"
                  }
                }
              ],
              ["@babel/preset-react"]
            ],
            plugins: [
              [
                "@babel/plugin-proposal-decorators",
                {
                  legacy: true
                }
              ],
              ["@babel/plugin-syntax-class-properties"],
              [
                "@babel/plugin-proposal-class-properties",
                {
                  loose: true
                }
              ],
              "@babel/plugin-proposal-export-default-from",
              "@babel/plugin-transform-runtime"
            ]
          }
        }
      }
    ]
  },
  performance: {
    hints: false
  },
  optimization: {
    namedModules: false,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          cache: true,
          sourceMap: false,
          exclude: /fkit\.js/,
          parse: {
            ecma: 8
          },
          parallel: true,
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2
          },
          mangle: {
            safari10: false
          },
          output: {
            ecma: 6,
            comments: false,
            ascii_only: true
          }
        }
      })
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin({
    //   analyzerMode: "static",
    //   openAnalyzer: false,
    //   reportFilename: "report.html"
    // })
  ],
  node: {
    fs: "empty",
    module: "empty"
  }
};
