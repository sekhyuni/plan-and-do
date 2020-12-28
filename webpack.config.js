const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.vue'] // for 확장자 생략
    },
    entry: ['@babel/polyfill', path.join(__dirname, 'src/main.js')],
    module: {
        rules: [{ // for babel
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }, { // for vue
            test: /\.vue$/,
            use: 'vue-loader'
        }, { // for css
            test: /\.css$/,
            use: [
                'vue-style-loader',
                {
                    loader: 'css-loader',
                    options: { // css-loader@4 이상부터 적용해야 하는 옵션
                        esModule: false
                    }
                },
            ]
        }, { // for scss
            test: /\.scss$/,
            use: ['vue-style-loader', {
                loader: 'css-loader',
                options: { // css-loader@4 이상부터 적용해야 하는 옵션
                    esModule: false
                }
            }, 'sass-loader']
        }]
    },
    plugins: [new VueLoaderPlugin(), new HtmlWebpackPlugin({
        // index.html 템플릿을 기반으로 빌드 결과물을 추가해줌
        template: './src/index.html',
    })],
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'src/dist')
    }
}