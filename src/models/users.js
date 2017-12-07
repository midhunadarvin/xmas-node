import fs from 'fs';
import async from 'async';
import parse from 'csv-parse';
import mongoose from 'mongoose';

import config from '../config.json';
import Counter from './counter';

var UserSchema = mongoose.Schema({
	index: { type: Number, default: 0 },
	photo: String,
	employeeId: String,
	firstName: String,
	lastName: String,
	mobilePhone: String,
	email: String,
	hobbies: String,
	likes: String,
	friend: { type: mongoose.Schema.ObjectId, ref: UserSchema }
});

UserSchema.pre('save', function (next) {
	var self = this;
	Counter.findByIdAndUpdate({ '_id': 'userId' }, { $inc: { index: 1 } }, function (err, counter) {
		if (err) return console.log(err);
		self.index = counter.index;
		next();
	});
});

const User = mongoose.model('User', UserSchema);

Counter.findOneAndUpdate({ '_id': 'userId' }, { '_id': 'userId' }, { upsert: true, new: true, setDefaultsOnInsert: true }, function (err, result) {
	if (err) return console.error(err);

	if (result.index === 0) {
		readData().then((value) => {
			createRelationships(76);
		});
	} else {
		console.log('Db has entries');
	}
});

function readData() {
	return new Promise((resolve, reject) => {
		fs.readFile(config.csvPath, (err, fileData) => {
			if (err) return console.log(err);
			parse(fileData, (err, rows) => {
				// Your CSV data is in an array of arrays passed to this callback as rows.
				if (err) return console.log(err);
				async.eachSeries(rows.splice(1), (row, callback) => {
					createUser({
						'photo': row[1],
						'employeeId': row[2],
						'firstName': row[3],
						'lastName': row[4],
						'mobilePhone': row[5],
						'email': row[6]
					}).then((user)=> {
						callback();
					});
				}, (error) => {
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
	User.find({}).sort({ "index": 1 }).exec((err, users) => {
		if (err) return console.log(err);
		var n = users.length;
		async.eachSeries(users, (element, callback) => {
			let friendIndex = (element.index + id) % n;
			findUser({ 'index': friendIndex }).then((friend) => {
				findUserAndUpdate({ 'index': element.index }, friend).then((user) => {
					callback();
				});
			});
		}, (error) => {
			if (error) res.json(500, { error: error });

			console.log('Relationships created');
		});
	});
}

function createUser(params) {
	return new Promise((resolve, reject) => {
		let user = new User(params);
		user.save((err, user) => {
			if (err) return console.error(err);
			resolve(user);
		});
	});
}

function findUser(params) {
	return new Promise((resolve, reject) => {
		User.findOne(params).exec((err, friend) => {
			if (err) return console.log(err);
			resolve(friend);
		});
	});
}

function findUserAndUpdate(params, friend) {
	return new Promise((resolve, reject) => {
		User.findOneAndUpdate(params, { $set: { 'friend': friend._id } }, { 'new': true }, (err, doc) => {
			resolve(doc);
		});
	});
	
}

export default User;