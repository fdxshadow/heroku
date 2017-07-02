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

  mostrarprod: function(req,res){
    var request = require('request');
    request.post({url:'https://api-comunication.herokuapp.com/prod', form: {Super:req.param('name'),Categoria:req.param('categoria')}}, function(err,httpResponse,body){
      var productos=JSON.parse(body);
      console.log(productos);
      res.view('compra/product',{productos:productos});
    });
  }
};

