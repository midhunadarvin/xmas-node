import resource from 'resource-router-middleware';
import User from '../models/users';

export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id: 'user',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	load(req, id, callback) {
		let user = users.find(user => user.id === id),
			err = user ? null : 'Not found';
		callback(err, user);
	},

	/** GET / - List all entities */
	index({ params }, res) {
		res.json(users);
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
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

		User.findOneAndUpdate(query, update, options, (err, user) => {
			if (err) return console.error(err);
			res.json({
				'status': '202',
				'message': 'User successfully updated/created'
			});
		});
	},

	/** GET /:id - Return a given entity */
	read({ user }, res) {
		res.json(user);
	},

	/** PUT /:id - Update a given entity */
	update({ user, body }, res) {
		
		res.sendStatus(204);
	},

	/** DELETE /:id - Delete a given entity */
	delete({ user }, res) {
		users.splice(users.indexOf(user), 1);
		res.sendStatus(204);
	}
});
