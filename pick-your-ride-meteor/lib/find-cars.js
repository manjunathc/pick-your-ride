/*
Webservice to return available cars in system
HTTP_METHOD: GET
 */



Router.route('/api/find/cars', function(){
    this.response.statusCode = 200;
    this.response.setHeader("Content-Type", "application/json");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    //find all cars thoose are not yet booked and available for renting

    var availableCars = getAvailableCars();




    this.response.end(JSON.stringify(availableCars));
}, {where: 'server'});


/*
This method will return list of available car
 - that has not been booked yet
*/


function getAvailableCars()
{
    //var availableCars=CarProfile.find({"is-booked": "false"}).fetch();
    var availableCars=CarProfile.find.fetch();
    return availableCars;
}


