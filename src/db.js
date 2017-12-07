import mongoose from 'mongoose';
import config from './config.json';
export default callback => {
	// connect to a database if needed, then pass it to `callback`:
	mongoose.connect(config.dbUrlProd, { 'useMongoClient': true });
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function () {
		// we're connected!
		console.log('Connected to Database!');
		callback(db);
	});
};
