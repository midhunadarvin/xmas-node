'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (callback) {
	// connect to a database if needed, then pass it to `callback`:
	_mongoose2.default.connect(_config2.default.dbUrlProd, { 'useMongoClient': true });
	var db = _mongoose2.default.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function () {
		// we're connected!
		console.log('Connected to Database!');
		callback(db);
	});
};
//# sourceMappingURL=db.js.map