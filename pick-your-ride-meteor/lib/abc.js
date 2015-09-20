/**
 * Created by sagarhazary on 9/19/15.
 */
/**
 * Created by sagarhazary on 9/19/15.
 */
Router.route('/api/store/booking', function(){
    this.response.statusCode = 200;
    this.response.setHeader("Content-Type", "application/xml");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


    var  payment=this.request.body;
    var vinNumber=payment.items[0].form.vin;
    var startDate=payment.items[0].form.start_date_time;
    var endDate=payment.items[0].form.end_date_time;
    var license=payment.items[0].form.drivers_license;
    license="ca12345";

    //get todays Date
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }

    today = mm+'/'+dd+'/'+yyyy;
    var randomNumber= Math.floor(Math.random()*90000) + 10000;
    Booking.insert({"vin": vinNumber,
        "booking-date":today,
        "booking-reference-number":randomNumber,
        "booking-is-active":"TRUE",
        "start_date_time":startDate ,
        "end_date_time":endDate ,
        "drivers_license": license});


    //fetch the user profile of the user using drivers license
    var user = UserProfile.find({"drivers_license": license}).fetch();
    console.log(user);

    //fetch the users phone number
    var userPhoneNumber = user[0].phone_number;
    console.log(userPhoneNumber);


//initiate Twilio
    var client = new Twilio({
        from: "+16504698810",
        sid: "ACa95035f362b19f3c504330656239d363",
        token: "b6181f4f8343b57d8f9828e95286d25b"

    });
//send messages
    client.sendSMS({
        to: userPhoneNumber,
        body: 'Your car has been booked. our Car Access Code is: '+randomNumber
    });

    this.response.end("<?xml version=\"1.0\" encoding=\"UTF-8\"?><response/>");
}, {where: 'server'});
