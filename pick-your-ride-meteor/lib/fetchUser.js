/**
 * Created by sagarhazary on 9/20/15.
 */
/**
 * Created by sagarhazary on 9/16/15.
 */


/*
 Fetch User information
 */

Router.route('/api/get/user', function(){
    this.response.statusCode = 200;
    this.response.setHeader("Content-Type", "application/json");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");



    this.response.end(JSON.stringify(UserProfile.find().fetch()));
}, {where: 'server'});
