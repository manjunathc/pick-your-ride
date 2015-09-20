/**
 * Created by sagarhazary on 9/15/15.
 */

// The Mobile app will request for a Quote by requesting data in Request Body.
//Tee server will respond with the value

Router.route('/api/requestQuote', function(){

    this.response.statusCode = 200;
    this.response.setHeader("Content-Type", "application/json");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


    var requestBody=this.request.body;



    //business logic here
    var bookingStartDate=requestBody.start_date_time;
    var bookingEndDate=requestBody.end_date_time;
    var vinNumber=requestBody.vin;
    var driversLicense=requestBody.drivers_license;

        //var price=calculateQuote(bookingStartDate,bookingEndDate,vinNumber,driversLicense);
    var price =50;

    this.response.end(JSON.stringify({"price":price}

        ));
}, {where: 'server'});

function calculateQuote(startDate,endDate,vin,drivers_license)
{
    var bookingStartDate=new Date(startDate);
    var bookingEndDate=new Date(endDate);
    var vinNumber=vin;
    var driversLicense=drivers_license;

    //Assumption is $0.10/ min for SUV
    //Driver rating is 5 for all driver
    //

    var totalRentTime =parseInt((bookingEndDate-bookingStartDate)/(3600*1000));
    console.log("booking time: "+ totalRentTime + vinNumber);

    var cars=CarProfile.find({"vin": vinNumber}).fetch();
   // var availableBookings=Booking.find({"drivers_license": driversLicense}).fetch();
    console.log("car "+ cars);
    //var carRate=cars.price;
    var carRate=parseInt(".05");
    console.log("car price"+ carRate.toString());
    var totalPrice=carRate*totalRentTime;
    return totalPrice;



}

