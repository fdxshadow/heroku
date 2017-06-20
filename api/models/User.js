/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  attributes:{
  		
		nombre:{
			type:'string',
			required:true
		},

		apellido:{
			type:'string',
			required:true,

		},

		email:{
			type:'string',
			required:true,
			email:true,
			unique:true

		},

		encryptedPassword:{
			type: 'string',
			
		},
		admin:{
			type:'boolean', 
			defaultsTo: false
		},

		TipoUsuario:{
			type:'string',
			defaultsTo: "normal"
		},
		toJSON: function() {
			var obj = this.toObject();
			delete obj.password;
			delete obj.confirmacion;
			delete obj.encryptedPassword;
			delete obj._csrf;
			return obj;
		}

	},

	beforeValidate: function (values, next){
			console.log(values);

			console.log(values.admin[1]);

			if(typeof values.admin !== 'undefined'){
				if(values.admin == 'unchecked'){
					values.admin = false;
				}else if(values.admin[1] == 'on'){
					values.admin = true;
				}
			}
			next();
	},

	beforeCreate: function (values, next){
			if(!values.password || values.password != values.confirmacion){
				return next({err: ["contraseña no coincide con la confirmacion"]});
			}

			require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword){
				if(err) return next(err);
				values.encryptedPassword = encryptedPassword;
				values.online= true;
				next();
			});
	}
};

