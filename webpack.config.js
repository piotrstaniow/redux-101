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

const fonts = {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: [
        'file-loader'
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
        rules: [pug, css, fonts],
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
