'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _csvParse = require('csv-parse');

var _csvParse2 = _interopRequireDefault(_csvParse);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('../config.json');

var _config2 = _interopRequireDefault(_config);

var _counter = require('./counter');

var _counter2 = _interopRequireDefault(_counter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSchema = _mongoose2.default.Schema({
	index: { type: Number, default: 0 },
	photo: String,
	employeeId: String,
	firstName: String,
	lastName: String,
	mobilePhone: String,
	email: String,
	hobbies: String,
	likes: String,
	friend: { type: _mongoose2.default.Schema.ObjectId, ref: UserSchema }
});

UserSchema.pre('save', function (next) {
	var self = this;
	_counter2.default.findByIdAndUpdate({ '_id': 'userId' }, { $inc: { index: 1 } }, function (err, counter) {
		if (err) return console.log(err);
		self.index = counter.index;
		next();
	});
});

var User = _mongoose2.default.model('User', UserSchema);

_counter2.default.findOneAndUpdate({ '_id': 'userId' }, { '_id': 'userId' }, { upsert: true, new: true, setDefaultsOnInsert: true }, function (err, result) {
	if (err) return console.error(err);

	if (result.index === 0) {
		readData().then(function (value) {
			createRelationships(76);
		});
	} else {
		console.log('Db has entries');
	}
});

function readData() {
	return new Promise(function (resolve, reject) {
		_fs2.default.readFile(_config2.default.csvPath, function (err, fileData) {
			if (err) return console.log(err);
			(0, _csvParse2.default)(fileData, function (err, rows) {
				// Your CSV data is in an array of arrays passed to this callback as rows.
				if (err) return console.log(err);
				_async2.default.eachSeries(rows.splice(1), function (row, callback) {
					createUser({
						'photo': row[1],
						'employeeId': row[2],
						'firstName': row[3],
						'lastName': row[4],
						'mobilePhone': row[5],
						'email': row[6]
					}).then(function (user) {
						callback();
					});
				}, function (error) {
					if (error) res.json(500, { error: error });
					console.log('Users added to database');
					resolve(true);
				});
			});
		});
	});
}

function createRelationships(id) {
	console.log('Creating Relationships');
	User.find({}).sort({ "index": 1 }).exec(function (err, users) {
		if (err) return console.log(err);
		var n = users.length;
		_async2.default.eachSeries(users, function (element, callback) {
			var friendIndex = (element.index + id) % n;
			findUser({ 'index': friendIndex }).then(function (friend) {
				findUserAndUpdate({ 'index': element.index }, friend).then(function (user) {
					callback();
				});
			});
		}, function (error) {
			if (error) res.json(500, { error: error });

			console.log('Relationships created');
		});
	});
}

function createUser(params) {
	return new Promise(function (resolve, reject) {
		var user = new User(params);
		user.save(function (err, user) {
			if (err) return console.error(err);
			resolve(user);
		});
	});
}

function findUser(params) {
	return new Promise(function (resolve, reject) {
		User.findOne(params).exec(function (err, friend) {
			if (err) return console.log(err);
			resolve(friend);
		});
	});
}

function findUserAndUpdate(params, friend) {
	return new Promise(function (resolve, reject) {
		User.findOneAndUpdate(params, { $set: { 'friend': friend._id } }, { 'new': true }, function (err, doc) {
			resolve(doc);
		});
	});
}

exports.default = User;
//# sourceMappingURL=users.js.map