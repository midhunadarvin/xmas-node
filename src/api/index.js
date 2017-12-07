import { version } from '../../package.json';
import { Router } from 'express';
import users from './users';
import GetFriend from './friend';
import SendEmails from './email';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/users', users({ config, db}));

	api.get('/friend', GetFriend);

	api.post('/sendemails', SendEmails);

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
};
