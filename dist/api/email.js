'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _resourceRouterMiddleware = require('resource-router-middleware');

var _resourceRouterMiddleware2 = _interopRequireDefault(_resourceRouterMiddleware);

var _users = require('../models/users');

var _users2 = _interopRequireDefault(_users);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _base = require('base-64');

var _base2 = _interopRequireDefault(_base);

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, res) {
	// Generate test SMTP service account from ethereal.email
	// Only needed if you don't have a real mail account for testing
	_nodemailer2.default.createTestAccount(function (err, account) {

		// create reusable transporter object using the default SMTP transport
		var transporter = _nodemailer2.default.createTransport({
			service: 'gmail',
			auth: {
				user: 'cabotdeveloper@gmail.com',
				pass: 'cabot1234'
			}
		});

		_users2.default.find().sort({ "index": 1 }).exec(function (err, users) {
			if (err) res.json(err);

			_async2.default.eachSeries(users, function (user, callback) {
				// setup email data with unicode symbols
				if (!(user.email == 'midhun.darvin@cabotsolutions.com' || user.email == 'akhila.antony@cabotsolutions.com')) {
					callback();
				} else {
					var message = 'Hi ' + user.firstName + ' ' + user.lastName + ',<br/><br/> Kindly login to ZOHO and Click on this link to view your christmas friend, (best viewed on a mobile device) <br/><br/> https://xmas-cabot.herokuapp.com?id=' + user.index;
					var mailOptions = {
						to: user.email, // list of receivers
						subject: 'Christmas Friend ✔', // Subject line
						text: message, // plain text body
						html: message // html body
					};

					// send mail with defined transport object
					transporter.sendMail(mailOptions, function (error, info) {
						if (error) {
							return console.log(error);
						}
						callback();
					});
				}
			}, function (error) {
				console.log('Mails Sent');
				res.json({ 'message': 'Mails Sent' });
			});
		});
	});
};
//# sourceMappingURL=email.js.map