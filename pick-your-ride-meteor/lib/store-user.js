/**
 * Created by sagarhazary on 9/18/15.
 */

/*
This program stores user information in a mongo collection.
Once user profile is created in mobile app, user data will be stored in UserProfile collection
 */

Router.route('/api/store/user', function(){
    this.response.statusCode = 200;
    this.response.setHeader("Content-Type", "application/json");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    //Get data from JSON.
    var user =this.request.body;



    //store the data in Database
    UserProfile.insert(user);

    this.response.end(JSON.stringify({"Status": "Success"}));
}, {where: 'server'});


