// Configure entry point and output location
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
    const isProd = env === 'production';
    const cssExtract = new MiniCssExtractPlugin({ filename: 'styles.css' });

    return {
        entry: './src/app.js',
        output: {
            'path': path.join(__dirname, 'public'),
            'filename': 'bundle.js'
        },
        mode: 'development',
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader', options: { sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ]
            }]
        },
        plugins: [
            cssExtract
        ],
        devtool: isProd ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true
        }
    };
};