/**
 * Created by sagarhazary on 9/19/15.
 */
/**
 * Created by sagarhazary on 9/19/15.
 */
Router.route('/api/store/makepayment', function(){
    this.response.statusCode = 200;
    this.response.setHeader("Content-Type", "application/json");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


    var  payment=this.request.body;

    var paymentCarVIN=payment.vin;


 //Mark Booking complete for Car
    Booking.update({
        "vin":paymentCarVIN
    }, {
        $set: {"booking-is-active": "FALSE"}
    });
console.log("here");
 // fetch the Users Drivers License info from Booking
//var userLicense=Booking.findOne({"vin":"paymentCarVIN"}).fetch();
//    var license= userLicense.license;
//
//    var user = UserProfile.find({"drivers_license": license}).fetch();
////fetch the user profile of the user using drivers license
//    var phoneNumber=user[0].phone_number;
//    var creditcard=user[0].payment.card_number
//        console.log(creditcard + " "+phoneNumber);
//
//
//    //Fetch Amount to be charged to Customers Credit Car and convert from cent to Dollar
    var makepayment =this.request.body;
    var priceDollar=makepayment.price;
    var priceCent=priceDollar*100;


//Initiating the Master Card Simplified commerce module
    var Simplify = Meteor.npmRequire("simplify-commerce"),
        client = Simplify.getClient({
            publicKey: 'sbpb_MmJlYmFmYmQtZTlhNy00MzAzLWFjYmEtMGI4NDJiZmI4ODE2',
            privateKey: 'SPtg6I9+1Mp1IABd5bv6ipQJRalDK2O5sT2x8xrBuQp5YFFQL0ODSXAOkNtXTToq'
        });
//Processing the payment
    client.payment.create({
        amount :priceCent ,
        description : "payment description",
        card : {
            expMonth : "8",
            expYear : "16",
            cvc : "123",
            number : "5555555555554444"
        }
    }, function(errData, data){

        if(errData){
            console.error("Error Message: " + errData.data.error.message);
            // handle the error
            return;
        }

        console.log("Payment Status: " + data.paymentStatus);
    });




    var client = new Twilio({
        from: "+16504698810",
        sid: "ACa95035f362b19f3c504330656239d363",
        token: "b6181f4f8343b57d8f9828e95286d25b"

    });

    client.sendSMS({
        to: '+14085077457',
        body: 'Thank you for using Pick UR Ride. Your trip cost $' +priceDollar+". The amount has been charged to your credit card."
    });


    this.response.end(JSON.stringify({"status": "SUCCESS"}));
}, {where: 'server'});
