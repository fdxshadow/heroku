/**
 * CompraController
 *
 * @description :: Server-side logic for managing compras
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	'supermercados': function(req, res){

     res.view();
  },
  categorias: function(req, res, next){
  			var nom =req.query.name
			res.view({nom:nom});
	},


   product: function(req, res){
   		var productos = req.param('json');	

         res.view({
         	productos:productos
         });
   },
	
};

