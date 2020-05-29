const path = require("path");
// const fs = require("fs");

const SRC_DIR = path.join(__dirname, "src");
const DIST_DIR = path.join(__dirname, "public");

// var nodeModules = {};
// fs.readdirSync(path.resolve(__dirname, "node_modules"))
//   .filter((x) => [".bin"].indexOf(x) === -1)
//   .forEach((mod) => {
//     nodeModules[mod] = `commonjs ${mod}`;
//   });

module.exports = {
  mode: "development",
  watch: true,
  entry: ["babel-polyfill", `${SRC_DIR}/index.tsx`],
  output: {
    filename: "bundle.js",
    path: DIST_DIR,
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  module: {
    rules: [
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        include: SRC_DIR,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.sass$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
    ],
  },
  // externals: nodeModules,
};
