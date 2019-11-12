var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'assets/js/bundle.js',
    },

    //servidor de desarrollo
    devServer : {
        port: 5000,
    },

    module: {
        rules: [
            //transpilador de babel
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: { loader: 'babel-loader' }
            },
            //procesamiento de stilos en sass
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it uses publicPath in webpackOptions.output
                            publicPath: '../../',
                        },
                    },
                    // Translates CSS into CommonJS
                    {
                        loader: 'css-loader', 
                            options: { sourceMap: true,}
                    },
                    {
                        loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                config: { path: 'postcss.config.js'}
                            }
                    },
                    // Compiles Sass to CSS
                    {
                        loader: 'sass-loader',
                            options: { sourceMap: true }
                    },
                ],
            },
            //procesamiento de imágenes
            {
                test: /\.(png|svg|jpe?g|gif)$/i,
                use : {
                    loader: 'file-loader',
                    options: {
                        name:'[name].[ext]',
                        outputPath: 'assets/images/',
                    }
                }
            },
            //procesamiento de tipografías
            {
                test: /\.(woff|woff2|otf|eot|ttf)$/,
                use : {
                    loader: 'file-loader',
                    options: {
                        name:'[name].[ext]',
                        outputPath: 'assets/fonts/',
                    }
                }
            },
        ],
    },

    plugins: [
        //copia los html
        new HtmlWebpackPlugin({
            template: './src/html/index.html', 
        }),
        /*new HtmlWebpackPlugin({
            template: './src/html/about.html', 
            filename: 'about.html'
        }),*/

        //procesamiento de css, para que arme un archivo css separado
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: 'assets/css/style.css',
            //chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        
        //copia la carpeta de imagenes
        new CopyWebpackPlugin([
            {from:'src/assets/images',to:'assets/images'} 
        ]), 
    ],
};