/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	'new': function (req, res){
		//res.locals.flash = _.clone(req.session.flash);
		res.view('user/new');
		//req.session.flash = {};
	},

	

	create: function (req, res, next){
		User.create(req.params.all(), function userCreated(err, user) {
			if(err) {
				console.log(err);
				req.session.flash = {
					err: err.ValidationError
				}
				return res.redirect('/user/new');
			}


			req.session.authenticated = true;
			req.session.User = user;
			res.redirect('/user/show/'+user.id)
			//res.json(user);	
			//req.session.flash = {};
		});
	},

	show: function (req, res, next){
		User.findOne(req.param('id'), function foundUser(err,user){
			if(err) return next(err);
			if(!user) return next();
			res.view({
				user: user
			});
		});
	},
	index: function(req, res, next){

		//console.log(new Date());
		//console.log(req.session.authenticated);
		User.find(function foundUsers (err, users){
			if(err) return next(err);
			res.view({
				users: users
			});
		});
	},
	edit: function(req, res, next){
		User.findOne(req.param('id'), function foundUser (err, user){
			if(err) return next(err);
			if(!user) return next('usuario no existe');
			res.view({
				user: user
			});
		});
	},
	update: function (req, res, next){
		console.log(req.param('admin'))
		User.update(req.param('id'), req.params.all(), function userUpdated (err){
			if(err){
				return 	res.redirect('/user/show/' + req.param('id'));

				//res.redirect('/user/edit/' + req.param('id'));
			}
			res.redirect('/user/show/' + req.param('id'));
		});
	},
	destroy: function (req, res, next){
		User.findOne(req.param('id'), function foundUser (err, user) {
			if (err) return next (err);

			if (!user) return next ('Usuario no existe');
			User.destroy(req.param('id'), function userDestroyed(err){
				if (err) return next (err);
			});
			res.redirect('/user');
		});
	}
};

