module.exports = function(Bitcoins) {

  var coinbase = require('coinbase');
  var async = require('async');


  Bitcoins.getCoins = function(vehicle_vin,btc_amount,notes,cb) {

    var Account   = require('coinbase').model.Account;
    var client = new coinbase.Client({
      'apiKey': 'JtqREi3ZJs0bZ9Fa',
      'apiSecret': 'VDnT2Fje8DHbYimYBFK5DUrQI2JBG3iZ',
      'baseApiUri': 'https://api.sandbox.coinbase.com/v1/'
    });
    var myBtcAcct = new Account(client, {'id': '55f61d82b0e9d646fb000115'});
    async.waterfall([
      function(callback) {
        client.getAccounts(function(err, accounts) {
          accounts.forEach(function(acct) {
            if (acct.id === myBtcAcct.id) {
              console.log("account id matches");
              if (acct.balance.amount > 0.1) {
                  console.log('my bal: ' + acct.balance.amount + ' for ' + acct.name + ' id ' + acct.id);
                  console.log('bal: ' + acct.balance.amount + ' currency: ' + acct.balance.currency);
                  callback(null, vehicle_vin,btc_amount,notes);
                }
              }
            });
          });
        },

      function callback(vehicle_vin,btc_amount,notes) {
        console.log("vehicle_vin-->"+vehicle_vin);
        console.log("btc_amount-->"+btc_amount);
        console.log("notes-->"+notes);

        var args = {
          "to": "moN5yVaCq4CVsFiQmqrcsdLZKtdHXuwjmi",
          "amount": "0.0035",
          "notes": "Sending Transactions"
        };

        myBtcAcct.sendMoney(args, function(err, txn) {

          if(err)
            throw err;
            console.log('Calling send BTC and my txn id is: ' + txn.id);
            cb(null, 'Txn ID ' + txn.id);
        });
      }
    ], function (err, result) {
        // result now equals 'done'
        console.log("Going into final Callback");
        cb(null,"Transaction id="+result);
        console.log("After into final Callback");
    });
  }

  Bitcoins.remoteMethod(
      'getCoins',
      {
        accepts: [
          {arg: 'vehicle_vin', type: 'string'},
          {arg: 'btc_amount', type: 'string'},
          {arg: 'notes', type: 'string'}
        ],
        returns: {arg: 'txn_id', type: 'string'},
        http: {path: '/getCoins', verb: 'get'}
      }
  );

};
