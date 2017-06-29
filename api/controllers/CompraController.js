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
    var name=req.param('super');
    var categorias=req.param('categoria');
    var socketIOClient = require('socket.io-client');
    var sailsIOClient = require('sails.io.js');
    var io = sailsIOClient(socketIOClient);
    io.sails.url = 'https://api-comunication.herokuapp.com';
    io.socket.post('/prod',{Super:name,Categoria:categorias},function(resData){

      res.view('compra/product');


    });
  }
};

