import ExtractTextPlugin from "extract-text-webpack-plugin";
import stylish from 'eslint/lib/formatters/stylish';
import path from "path";
import webpack from "webpack";

module.exports = {
	entry: [
		'./src/js/index.jsx'
	],
	output: {
		path: __dirname,
		publicPath: '/',
		filename: 'bundle.js'
	},
	devtool: 'cheap-module-inline-source-map',
	module: {
		preLoaders: [
			{
				test: /\.jsx?$/,
				loader: 'eslint',
				exclude: /node_modules/
			}
		],
		loaders: [{
			exclude: /node_modules/,
			loader: 'babel'
		}, {
			test: /\.scss$/,
			loaders: ["style", "css", "sass"]
		}, {
			test: /\.css$/,
			loader: "style!css?modules"
		}]
	},
	sassLoader: {
		includePaths: [path.resolve(__dirname, "./src/sass")]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			}
		})
	],
	resolve: {
		extensions: ['', '.js', '.jsx', '.scss', '.json'],
		modulesDirectories: [
			'node_modules',
			path.resolve(__dirname, './node_modules')
		]
	},
	devServer: {
		historyApiFallback: true,
		contentBase: './'
	},
	eslint: {
		configFile: path.join(__dirname, '.eslintrc'),
		emitErrors: true,
		emitWarning: true
	}
};
