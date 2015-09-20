/**
 * Created by sagarhazary on 9/16/15.
 */


/*
Stores Booking info of the car
 */

Router.route('/api/store/booking1', function(){
    var body1=this.request.body;
    console.log(typeof request.content)
    //var  payment=this.request.body;

    console.log("This is vin " + body1);

    this.response.statusCode = 200;
    this.response.setHeader("Content-Type", "html/text");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");





    //store the data in Database
    //Booking.insert(booking);

    var client = new Twilio({
        from: "+16504698810",
        sid: "ACa95035f362b19f3c504330656239d363",
        token: "b6181f4f8343b57d8f9828e95286d25b"

    });

    client.sendSMS({
            to: '+14085077457',
            body: 'Your car has been booked. our Car Access Code is: 318632'
        });

    this.response.end(JSON.stringify({"ABC": "booking stored"}));
}, {where: 'server'});
