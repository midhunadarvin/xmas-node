import resource from 'resource-router-middleware';
import User from '../models/users';

export default (req, res) => {
	console.log(req.query.id);
	if(!req.query.id) {
		res.json({'message': 'Query param not found'});
		return;
	}
	User.findOne({ 'index': req.query.id }).populate('friend').exec((err, user) => {
		if(err){
			res.json(err);
			return;
		}else {
			if (user)
				res.json(user.friend);
			else
				res.json({ 'message': 'Could\'nt get Friend' });
		}
		
	});
};

