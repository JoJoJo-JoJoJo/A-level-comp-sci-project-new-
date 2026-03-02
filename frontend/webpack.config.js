//? Importing JS built-in file path utilities + HTML Webpack plugin for bundling html templates into the output directory
import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";

//? Defining the path to the frontend folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  //? The entry points for the application
  entry: "./src/router.ts",
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    //? Defines the port number to be used for the frontend in development
    port: 8080,
    static: "./dist",
    historyApiFallback: true
  },
  module: {
    //? Defines rules for compiling and bundling different types of files
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      }
    ],
  },
  //? Defines the file types to be bundled - used to emit unnecessary code such as 'node_modules'
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css"],
  },
  //? Defines the location for bundled files output from compilation
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  //? Inserts a custom-made template html file into the output bundle
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: `./src/index.html`,
      filename: `index.html`,
    })
  ],
  // optimization: {
  //   splitChunks: {
  //     chunks: "all"
  //   }
  // },
};
