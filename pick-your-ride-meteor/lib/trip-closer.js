/**
 * Created by sagarhazary on 9/16/15.
 */



// The Mobile app will request for a Quote by requesting data in Request Body.
//Tee server will respond with the value

Router.route('/api/tripCloser', function(){

    this.response.statusCode = 200;
    this.response.setHeader("Content-Type", "application/json");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


    var requestBody=this.request.body

    var quoteValue = 200;


    console.log(Meteor.settings.public.TWILIO.FROM);
    //business logic here
    var client = new Twilio({
        from: Meteor.settings.public.TWILIO.FROM,
        sid: Meteor.settings.public.TWILIO.SID,
        token: Meteor.settings.public.TWILIO.TOKEN
    });

    //client.sendSMS({
    //    to: '+14085077457',
    //    body: 'Hello world!'
    //});


    this.response.end(JSON.stringify({"price":quoteValue}

    ));
}, {where: 'server'});

