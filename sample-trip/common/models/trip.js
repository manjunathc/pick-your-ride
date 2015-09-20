var async = require('async');
var moment = require('moment')
var request = require('request');


module.exports = function(Trip) {

		async.waterfall([
		 function(callback) {
				 callback(null, 'one', 'two');
		 },
		 function(arg1, arg2, callback) {
			 // arg1 now equals 'one' and arg2 now equals 'two'
				 callback(null, 'three');
		 },
		 function(arg1, callback) {
				 // arg1 now equals 'three'
				 callback(null, 'done');
		 }
	], function (err, result) {
		 // result now equals 'done'
	});



		Trip.vehicleLocation = function(msg,cb) {
			console.log(msg);
			async.waterfall([
					 function(callback) {
						 Trip.findOne({where:{"vehicleId": msg}},function(newcb,vdet){
							console.log("Responding to Vehicle Details-->"+JSON.stringify(vdet));
							console.log("jsonData.start-->"+moment(vdet.start).format("YYYY-MM-DD"));
							console.log("jsonData.stop-->"+moment(vdet.stop).format("YYYY-MM-DD"));
						//
							var startDate = moment(vdet.start, 'YYYY-M-DD HH:mm:ss')
							var endDate = moment(vdet.stop)
							var dateDiff = endDate.diff(startDate, 'hours');
							console.log("dateDiff-->"+-dateDiff);
							//cb(null,vdet);
							callback(null,dateDiff);
						});
					},

					function (dateDiff,callback){

						console.log("in Callback-->"+-dateDiff);

						//request.get(getBaseURL() + 'http://localhost:3000/api/bitcoins/getCoins?vehicle_vin=123467&btc_amount=0.0025&notes=Travel%20for%20Location%20x%20to%20Location%20y', function (err, response, body) {
						request.get('http://localhost:3000/api/bitcoins/getCoins?vehicle_vin=123467&btc_amount=0.0025&notes=Travel%20for%20Location%20x%20to%20Location%20y', function (err, response, body) {
								console.log("inside API-->"+body);
						if(err)
				      throw err;

							var cleaned = body.trim();
							var json = JSON.parse(cleaned);

							console.log("Body-->"+json.txn_id);
						});
						cb(null,dateDiff);
					}
			]);
	  }

    Trip.remoteMethod(
        'vehicleLocation',
        {
          accepts: {arg: 'vin', type: 'string'},
          returns: {arg: 'vehicleDetails', type: 'string'},
          http: {path: '/vehicleDetails', verb: 'get'}
        }
    );

		Trip.receiveBTC = function(msg,cb) {

		    console.log("Responding to Vehicle Details");

		    var sendBTC = {
								   "vehicleId": "0c785aa0-1a48-4cc6-9f5c-028350dd907d",
								   "BTC_ADDRESS": "-96.789791",
								   "BTC_AMOUNT": "32.780046"
								 }
		    cb(null, 'BITCOIN CHARGES FROM VEHICLE ' + JSON.stringify(sendBTC));

	    }

	    Trip.remoteMethod(
	        'receiveBTC',
	        {
	          accepts: {arg: 'vin', type: 'string'},
	          returns: {arg: 'vehicleDetails', type: 'string'},
	          http: {path: '/sendBTC', verb: 'post'}
	        }
	    );

			function getBaseURL() {
			  var ip = process.env.IP || process.env.HOST || '127.0.0.1';
			  var port = process.env.PORT || 3000;
			  var baseURL = 'http://' + ip + ':' + port + '/api';
			  return baseURL;
			}


};
