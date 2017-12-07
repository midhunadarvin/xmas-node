import resource from 'resource-router-middleware';
import User from '../models/users';
import async from 'async';
import base64 from 'base-64';
import nodemailer from 'nodemailer';

export default (req, res) => {
	// Generate test SMTP service account from ethereal.email
	// Only needed if you don't have a real mail account for testing
	nodemailer.createTestAccount((err, account) => {

		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'cabotdeveloper@gmail.com',
				pass: 'cabot1234'
			}
		});

		

		User.find().sort({ "index": 1 }).exec((err, users) => {
			if (err)
				res.json(err);
			
			async.eachSeries(users, (user, callback) => {
				// setup email data with unicode symbols
				if (!((user.email == 'midhun.darvin@cabotsolutions.com') || (user.email == 'akhila.antony@cabotsolutions.com'))) {
					callback();
				}else {
					let message = 'Hi ' + user.firstName + ' ' + user.lastName + ',<br/><br/> Kindly login to ZOHO and Click on this link to view your christmas friend, (best viewed on a mobile device) <br/><br/> https://xmas-cabot.herokuapp.com?id=' + user.index;
					let mailOptions = {
						to: user.email, // list of receivers
						subject: 'Christmas Friend ✔', // Subject line
						text: message, // plain text body
						html: message // html body
					};

					// send mail with defined transport object
					transporter.sendMail(mailOptions, (error, info) => {
						if (error) {
							return console.log(error);
						}
						callback();
					});
				}
			}, (error) => {
				console.log('Mails Sent');
				res.json({'message': 'Mails Sent'});
			});
		});
	});

	
};

