const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");

const isDev = process.env.NODE_ENV === "development";

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: "all"
        }
    }
    if (!isDev) {
        config.minimizer = [
            new OptimizeCssAssetsPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const cssLoaders = extra => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: true,
            }
        },
        {
            loader: 'css-loader',
            options: {
                importLoaders: 1,
                modules: true // 1
            }
        }];

        // "css-loader"];

    if (extra) {
        loaders.push(extra);
    }

    return loaders;
}

const babelOptons = preset => {
    const opt = {
        presets: [
            "@babel/preset-env"
        ],
        plugins: [
            "@babel/plugin-proposal-class-properties"
        ]
    }

    if (preset) {
        opt.presets.push(preset);
    }
    return opt;
}

const jsLoaders = () => {
    const loaders = [{
        loader: "babel-loader",
        options: babelOptons()
    }];

    if (isDev) {
        loaders.push("eslint-loader");
    }

    return loaders;
}

const plugins = () => {
    const base = [
        new HTMLWebpackPlugin({
            template: "./index.html",
            minify: {
                collapseWhitespace: !isDev
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, "src/favicon.ico"),
                to: path.resolve(__dirname, "dist")
            }
        ]),
        new MiniCssExtractPlugin({
            filename: filename('css')
        })
    ]

    if (!isDev) {
        base.push(new BundleAnalyzerPlugin());
    }

    return base;
}
//Точки входа, импорт полифила, точки выхода, расширения и алиасы
module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: "development",
    entry: {
        main: ["@babel/polyfill", "./index.jsx"],
        analitics: "./analitics.ts"
    },

    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, "dist")
    },

    resolve: {
        extensions: [".js", ".json", ".jpg"],
        alias: {
            "@models": path.resolve(__dirname, "src/models"),
            "@": path.resolve(__dirname, "src")
        }
    },

    optimization: optimization(),

    devtool: isDev ? "source-map" : "",

    // Сервер разработки
    devServer: {
        port: 4200,
        hot: isDev
    },
// Плагины, константы импортируются вверху
    plugins: plugins(),

// CSS, SASS, LESS, loaders, TS, JS, JPG,PNG, XML, SVC
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.less$/,
                use: cssLoaders("less-loader")
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders("sass-loader")
            },
            {
                test: /\.(png|svg|gif|jpg|jpeg)$/,
                use: ["file-loader"]
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ["file-loader"]
            },
            {
                test: /\.xml$/,
                use: ["xml-loader"]
            },
            {
                test: /\.csv$/,
                use: ["csv-loader"]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: {
                    loader: "babel-loader",
                    options: babelOptons("@babel/preset-typescript")

                }
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: {
                    loader: "babel-loader",
                    options: babelOptons("@babel/preset-react")

                }
            }
        ]
    }
}
