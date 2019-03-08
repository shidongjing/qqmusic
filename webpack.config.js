const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: "./src/js/index.js", // 入口
    output: { // 出口
        filename: "[name].js", // 生成打包文件的名字
        path: path.join(__dirname, "dist"), // 打包文件的路径，__dirname指当前根目录,
        // publicPath:'dist/'
    },
    devServer: {
        // 设置基本目录结构
        contentBase: path.join(__dirname, "dist"),
        // 服务器的ip地址，也可以使用localhost
        host: "localhost",
        // 服务端压缩是否开启
        compress: true,
        // 配置服务端口号
        port: 8081,

    },
    module: {
        // css loader
        rules: [
            // css loader
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader",
                })
            },
            {
                test: /\.(png|jpg|gif|jpeg)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 500, //是把小于500B的文件打成Base64的格式，写入JS
                        outputPath: 'images/'
                    }
                }]
            },
            {
                test: /\.(htm|html)$/i,
                use: ["html-withimg-loader"]
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "less-loader"]
                }),
                // use: ["style-loader", "css-loader", "less-loader"]
            }

        ],
        unknownContextRegExp: /$^/,
        unknownContextCritical: false,

        // require(expr)
        exprContextRegExp: /$^/,
        exprContextCritical: false,

        // require("prefix" + expr + "surfix")
        wrappedContextRegExp: /$^/,
        wrappedContextCritical: false

    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/html/index.html',
            // chunks: ['index'],  // 多入口时需要用到
            hash: true // 插入的文件后面加一段随机数
        }),
        new ExtractTextPlugin({
            filename: "index.css",
        })
    ],
}