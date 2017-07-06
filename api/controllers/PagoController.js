/**
 * PagoController
 *
 * @description :: Server-side logic for managing pagoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	pagar:function (req,res) {
		var monto = parseInt(req.param('monto'));
		var khipu = require('fi-khipu');
		var id="131503";
		var secret="25fd358789c95d5669acdb88643604cb7c98265d";
		khipu.configure(id,secret);
		var payment = {
  		subject: 'Compra venta facil',
  		amount: monto 
		};

		khipu.createPayment(payment, function callback(err, payment) {
  		if (err) {
    		throw err;
  			}
  			console.log(payment);

  			res.redirect(payment.payment_url);


	
		});



	}
	
};

