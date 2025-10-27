const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.[contenthash].js",
        clean: true,
        publicPath: "/fit-file-tools/",
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            title: "FIT File Reader",
        }),
        new webpack.ProvidePlugin({
            Buffer: ["buffer", "Buffer"],
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        compress: true,
        port: 9000,
        open: true,
        hot: true,
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        fallback: {
            buffer: require.resolve("buffer/"),
            stream: false,
            util: false,
            crypto: false,
            fs: false,
            path: false,
        },
    },
};
