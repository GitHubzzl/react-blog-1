var express = require('express'),
	webpack = require('webpack'),
	config = require('./webpack.dev.conf'),
	commonPath = require('./commonPath'),
	app = express();

const proxy = require('./proxy');
const proxyurl = 'http://localhost:9001/';
app.use('/blog/*', proxy(proxyurl));

var compiler = webpack(config);

// for highly stable resources
app.use('/static', express.static(commonPath.output));
app.use('/', express.static(commonPath.rootPath));

// serve webpack bundle output
app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));

// enable hot-reload and state-preserving
// compilation error display
app.use(require('webpack-hot-middleware')(compiler));

app.listen(8088, 'localhost', function(err) {
	err && console.log(err);
});