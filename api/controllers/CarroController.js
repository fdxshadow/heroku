/**
 * CarroController
 *
 * @description :: Server-side logic for managing carroes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	add:function (req,res) {
		var id_producto=req.body.idp;
		var nombre=req.body.nombre;
		var precio=req.body.precio;
		var id_usuario=req.body.idu;
		Carro.create({id_cliente:id_usuario,id_producto:id_producto,nombre:nombre,precio:precio}).exec(function (err, finn){
		  if (err) { return res.serverError(err); }
		  console.log(finn);
		  return res.send('ok');
		});
	},

	mostrar:function(req,res){
		console.log(req.param('id'));

		res.view();


	}
	
};

