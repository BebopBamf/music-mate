const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    devtool: 'inline-source-map',
    
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.m?js/,
                resolve: {
                fullySpecified: false,
            },
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
        ],
    },
    resolve: {
        alias: {
            components: path.resolve(__dirname, "src/components/"),
            routes: path.resolve(__dirname, "src/routes/"),
        },
        extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
            },
        }),
    ],
    devServer: {
        contentBase: "./dist",
        historyApiFallback: true,
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
};
