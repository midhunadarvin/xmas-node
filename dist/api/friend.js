'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _resourceRouterMiddleware = require('resource-router-middleware');

var _resourceRouterMiddleware2 = _interopRequireDefault(_resourceRouterMiddleware);

var _users = require('../models/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, res) {
	console.log(req.query.id);
	if (!req.query.id) {
		res.json({ 'message': 'Query param not found' });
		return;
	}
	_users2.default.findOne({ 'index': req.query.id }).populate('friend').exec(function (err, user) {
		if (err) {
			res.json(err);
			return;
		} else {
			if (user) res.json(user.friend);else res.json({ 'message': 'Could\'nt get Friend' });
		}
	});
};
//# sourceMappingURL=friend.js.map