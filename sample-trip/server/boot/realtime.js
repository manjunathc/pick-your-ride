var moment = require('moment')

var async = require('async');

module.exports = function(app) {
  var MyModel = app.models.trip;
  var request = require('request');

   MyModel.observe('after save', function(ctx, next) {
      if (ctx.instance) {
        console.log('Saved %s#%s', ctx.Model.modelName, ctx.instance.start);
        var vehicle_vin = ctx.instance.vehicleId;

        btc = "0.0015";
        notes = "Trip Cost for "+vehicle_vin;


        async.waterfall([
          function(callback) {
            request.get('http://localhost:3000/api/bitcoins/getCoins?vehicle_vin='+vehicle_vin+
                        '&btc_amount='+btc+
                        '&notes='+notes,
                        function (err, response, body) {
            console.log("inside API-->"+body);
            if(err)
              throw err;

              var cleaned = body.trim();
              var json = JSON.parse(cleaned);

              console.log("Body-->"+json.txn_id);
              var covertedToDollar = getollarsPriceFromDBitcoin(btc);
              callback(null, vehicle_vin, covertedToDollar);
            });
          },
          function(vehicle_vin, covertedToDollar, callback) {
            // arg1 now equals 'one' and arg2 now equals 'two'
              console.log("In another callback before invoking master card-->"+vehicle_vin);
              var dataforMC = '{"vin":"'+vehicle_vin+'","price":"'+covertedToDollar+'"}';
              console.log("dataforMC-->"+dataforMC);
              var Json = JSON.parse(dataforMC);
              //console.log("Converted JSON-->"+Json);
              request.post({
                   headers: {'content-type' : 'application/JSON'},
                   url:     'http://pickndrive.meteor.com/api/store/makepayment',
                   body: dataforMC
                 }, function(error, response, body){
                   console.log(body);
              });

              }

          ], function (err, result) {
            // result now equals 'done'
          });


        }
        next();

      });



    function getollarsPriceFromDBitcoin(BTC) {
      return "110";
    }

}
