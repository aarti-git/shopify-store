const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const pathToMainCss = require.resolve("./css/style.scss");
// const svgToMiniDataURI = require('mini-svg-data-uri');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: "development",
  entry: {
    css: "./css/style.scss",
    main: "./app.js",
  },
  output: {
    path: path.join(__dirname, "./dist"),
    filename: '[name].bundle.js',
  },

  resolve: {
    alias: {
			"@js": path.resolve(__dirname, "./js"),
			"@temp": path.resolve(__dirname, "./templates"),
      "@router": path.resolve(__dirname, "./router"),
      // "@img": path.resolve(__dirname, "./img"),
    },
  },

  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //   },
  // },

  // loader
  module: {
    rules: [
      {
        test: /\.s[ac]ss/i,
        use: ["style-loader", "css-loader", "sass-loader", ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: "asset/resource",
      },
      // fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
			},
			{
				test: /\.html$/i,
				use: ["html-loader", {
          loader: path.resolve(__dirname, './js/view-loader.js')
        }]
			},
    ],
  },

  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    historyApiFallback: true,
    port: 3000,
  },

  plugins: [
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Development",
      template: "index.html",
    }),
  ],
};
