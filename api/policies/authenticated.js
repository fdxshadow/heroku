module.exports = function(req, res, ok){
	if(req.session.authenticated){
		return ok();
	}
	else{
		var requireLoginError = [{name: 'login requerido', message: 'necesitas iniciar session'}]
		req.session.flash = {
			err: requireLoginError
		}
		res.redirect ('/session/new');
		return;
	}
};
