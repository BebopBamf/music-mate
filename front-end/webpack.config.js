const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  resolve: {
    alias: {
      Components: path.resolve(__dirname, "src/components/"),
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
