/**
 * Created by sagarhazary on 9/18/15.
 */
/*
 Webservice call to return All  cars bookings associated with the driver from system
 HTTP_METHOD: GET
 */



    Router.route('/api/get/bookings', function(){

    this.response.statusCode = 200;
    this.response.setHeader("Content-Type", "application/json");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    //find all cars thoose are not yet booked and available for renting
    var requestBody=this.request.body;
        var license=requestBody.drivers_license;
        console.log(license);
         license="ca12345";

        getAvailableBookings(license);

console.log(Booking.find().fetch());

    //this.response.end(JSON.stringify(bookings));
        this.response.end(JSON.stringify(getAvailableBookings(license)));
}, {where: 'server'});


/*
 This method will return list of booking done by the drivers License

 */


function getAvailableBookings(driversLicense)
{
    var availableBookings=Booking.find({"drivers_license": driversLicense}).fetch();
    return availableBookings;
}

