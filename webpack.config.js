const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pug = {
    test: /\.pug$/,
    use: ['html-loader?attrs=false', 'pug-html-loader'],
};

const css = {
    test: /\.css$/,
    use: [
        'style-loader',
        'css-loader',
    ]
};

module.exports = {
    entry: './index.js',
    devServer: {
        hot: true,
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [pug, css],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.pug',
            inject: false,
        }),
        new webpack.HotModuleReplacementPlugin(),
    ]
};
