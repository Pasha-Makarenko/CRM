/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
const path = require("path"),
	HTMLWebpackPlugin = require("html-webpack-plugin"),
	{CleanWebpackPlugin} = require("clean-webpack-plugin"),
	CopyWebpackPlugin = require("copy-webpack-plugin"),
	MiniCssExtractPlugin = require("mini-css-extract-plugin"),
	TerserWebpackPlugin = require("terser-webpack-plugin"),
	CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin"),
	ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin"),
	HTMLWebpackLiveReloadPlugin = require("html-webpack-live-reload-plugin"),
	ESLintWebpackPlugin = require("eslint-webpack-plugin"),
	isDev = process.env.NODE_ENV === "development",
	isProd = !isDev

const optimization = () => {
	const config = {
		splitChunks: {
			chunks: "all"
		}
	}

	if (isProd) config.minimizer = [
		new CssMinimizerWebpackPlugin(),
		new TerserWebpackPlugin()
	]

	return config
}

const filename = ext => isDev ? `[name]${ext}` : `[name].[fullhash]${ext}`

const cssLoader = loader => {
	const config = [
		{
			loader: MiniCssExtractPlugin.loader,
			options: {
				publicPath: "../"
			},
		},
		"css-loader",
		{
			loader: "postcss-loader",
			options: {
				postcssOptions: {
					plugins: [
						[
							"autoprefixer",
						]
					]
				}
			}
		}
	]

	if (loader) config.push(loader)

	return config
}

const plugins = () => {
	return [
		new HTMLWebpackPlugin({
			template: "./index.html",
			inject: "body",
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "src/favicon.ico"),
					to: path.resolve(__dirname, "dist")
				},
				{
					from: path.resolve(__dirname, ".gitignore"),
					to: path.resolve(__dirname, "dist")
				}
			]
		}),
		new MiniCssExtractPlugin({
			filename: `css/${filename(".css")}`
		}),
		new ImageminWebpWebpackPlugin({
			config: {
				test: /\.(png|jpe?g|gif|webp)$/,
				options: {
					quality: 40
				}
			},
			overrideExtension: true,
			detailedLogs: false,
			silent: false,
			strict: true
		}),
		new HTMLWebpackLiveReloadPlugin(),
		new ESLintWebpackPlugin({
			extensions: ["js", "ts", "jsx", "tsx"],
			failOnError: false
		})
	]
}

module.exports = {
	context: path.resolve(__dirname, "src"),
	mode: "development",
	entry: {
		main: ["@babel/polyfill", "./ts/index.ts"]
	},
	output: {
		filename: `${filename(".js")}`,
		publicPath: "auto",
		path: path.resolve(__dirname, "dist"),
		assetModuleFilename: "[path][name][ext]"
	},
	resolve: {
		extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
		alias: {
			"@": path.resolve(__dirname, "src")
		}
	},
	optimization: optimization(),
	devServer: {
		port: 3000,
		hot: isDev,
		open: true,
		watchFiles: path.join(__dirname, "/src"),
		historyApiFallback: true,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
			"Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
		},
		proxy: {
			"/api": {
				target: "http://localhost:3000",
				pathRewrite: {"^/api" : ""}
			}
		}
	},
	devtool: isDev ? "source-map" : false,
	plugins: plugins(),
	module: {
		rules: [
			{
				test: /\.(js|ts)x?$/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			},
			{
				test: /\.css$/,
				use: cssLoader()
			},
			{
				test: /\.s[ac]ss$/,
				use: cssLoader("sass-loader")
			},
			{
				test: /\.less$/,
				use: cssLoader("less-loader")
			},
			{
				test: /\.html$/,
				include: path.resolve(__dirname, 'src/html/'),
				use: "html-loader"
			},
			{
				test: /\.(png|jpg|jpeg|svg|gif|mp4|webp|webm)$/,
				type: 'asset/resource',
				generator: {
					filename: `./img/${filename("[ext]")}`
				},
			},
			{
				test: /\.(ttf|woff|woff2|otf|eot)$/,
				type: 'asset/resource',
				generator: {
					filename: `./fonts/${filename("[ext]")}`
				}
			},
			{
				test: /\.xml$/,
				use: ["xml-loader"]
			},
			{
				test: /\.csv$/,
				use: ["csv-loader"]
			}
		]
	}
}