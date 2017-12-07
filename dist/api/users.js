'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _resourceRouterMiddleware = require('resource-router-middleware');

var _resourceRouterMiddleware2 = _interopRequireDefault(_resourceRouterMiddleware);

var _users = require('../models/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
	var config = _ref.config,
	    db = _ref.db;
	return (0, _resourceRouterMiddleware2.default)({

		/** Property name to store preloaded entity on `request`. */
		id: 'user',

		/** For requests with an `id`, you can auto-load the entity.
   *  Errors terminate the request, success sets `req[id] = data`.
   */
		load: function load(req, id, callback) {
			var user = users.find(function (user) {
				return user.id === id;
			}),
			    err = user ? null : 'Not found';
			callback(err, user);
		},


		/** GET / - List all entities */
		index: function index(_ref2, res) {
			var params = _ref2.params;

			res.json(users);
		},


		/** POST / - Create a new entity */
		create: function create(_ref3, res) {
			var body = _ref3.body;

			console.log(body);
			var query = {
				'index': body.index ? body.index : null
			};
			var updateProperties = {};
			if (body.photo) updateProperties.photo = body.photo;
			if (body.employeeId) updateProperties.employeeId = body.employeeId;
			if (body.firstName) updateProperties.firstName = body.firstName;
			if (body.lastName) updateProperties.lastName = body.lastName;
			if (body.mobilePhone) updateProperties.mobilePhone = body.mobilePhone;
			if (body.email) updateProperties.email = body.email;
			if (body.likes) updateProperties.likes = body.likes;
			if (body.hobbies) updateProperties.hobbies = body.hobbies;

			var update = { $set: updateProperties };
			var options = { upsert: true, new: true, setDefaultsOnInsert: true };

			_users2.default.findOneAndUpdate(query, update, options, function (err, user) {
				if (err) return console.error(err);
				res.json({
					'status': '202',
					'message': 'User successfully updated/created'
				});
			});
		},


		/** GET /:id - Return a given entity */
		read: function read(_ref4, res) {
			var user = _ref4.user;

			res.json(user);
		},


		/** PUT /:id - Update a given entity */
		update: function update(_ref5, res) {
			var user = _ref5.user,
			    body = _ref5.body;


			res.sendStatus(204);
		},


		/** DELETE /:id - Delete a given entity */
		delete: function _delete(_ref6, res) {
			var user = _ref6.user;

			users.splice(users.indexOf(user), 1);
			res.sendStatus(204);
		}
	});
};
//# sourceMappingURL=users.js.map