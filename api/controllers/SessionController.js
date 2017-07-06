/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


	'new': function(req, res){

		//var oldDateObj = new Date();
		//var newDateObj = new Date(oldDateObj.getTime() + 60000);
		//req.session.cookie.expires = newDateObj;
		//req.session.authenticated = true; 
		//console.log(req.session);
		res.view('session/new');
	},
	create: function(req, res, next){
		var bcrypt = require('bcrypt');
		console.log(req.param('email'));
		console.log(req.param('password'));

		if(!req.param('email') || !req.param('password')){
			var usernamePasswordRequiredError = [{name: 'usernamePasswordRequired', message: 'you must enter both a username and password'}]
				req.session.flash = {
					err: usernamePasswordRequiredError
				}
			res.redirect('/session/new');
			return;
		}
		User.findOneByEmail(req.param('email'), function foundUser(err, user) {

			if(err) return next(err);
			if(!user){
				var noAccountError = [{nombre:'noAccount', message: 'direccion correo  ' + req.param('email') + '  no encontrada'}]
				req.session.flash= {
					err: noAccountError
				}
				res.redirect('/session/new');
				return;
			}
			console.log(user.encryptedPassword);
			bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid){
				if(err) return next(err);
				if(!valid){
					var usernamePasswordMismatchError = [{name: 'usernamePasswordMismatch', message: 'usuario y contraseña invalida.'}]
					req.session.flash = {
						err: usernamePasswordMismatchError
					}
					res.redirect('/session/new');
					return;
				}
				req.session.authenticated = true;
				req.session.User = user;
				//console.log(user.id);
				if(req.session.User.admin){
					res.redirect('/user');
					return;
				}
				if(req.session.authenticated){

					res.redirect('/')
				}



				//res.redirect('/');
				//res.redirect('/user/show/' + user.id);	
			});
		});

	},
	destroy: function(req, res, next){
		req.session.destroy();
		res.redirect('/');
	}	
};

