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
      // {
      //   test: /\.css$/i,
      //   use: [MiniCssExtractPlugin.loader, 'css-loader'],
      // },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
			},
			{
				test: /\.html$/i,
				use: ["html-loader"]
			},
      {
        test: /\.svg$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },

  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    port: 3000,
  },

  resolve: {
    alias: {
			"@js": path.resolve(__dirname, "./js"),
			"@temp": path.resolve(__dirname, "./templates"),
    },
  },

  plugins: [
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Development",
      template: "index.html",
    }),
  ],
};
