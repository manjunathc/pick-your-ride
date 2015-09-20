/**
 * Created by sagarhazary on 9/16/15.
 */
/**
 * Created by sagarhazary on 9/18/15.
 */
/*
 Webservice call to return All  cars bookings associated with the driver from system
 HTTP_METHOD: GET
 */



Router.route('/api/get/bookingsdetails', function(){
    this.response.statusCode = 200;
    this.response.setHeader("Content-Type", "application/json");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");




    this.response.end(JSON.stringify(CarBooking.find().fetch()));
}, {where: 'server'});


/*
 This method will return list of booking done by the drivers License

 */


function getAvailableBookings(driversLicense)
{
    var availableBookings=Booking.find({"drivers_license": driversLicense}).fetch();
    return availableBookings;
}

