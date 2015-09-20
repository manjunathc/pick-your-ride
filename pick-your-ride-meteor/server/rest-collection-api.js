/**
 * Created by sagarhazary on 9/15/15.
 */

if (Meteor.isServer) {
    Meteor.startup(function () {


        console.log("in server start car1s");
        collectionApi = new CollectionAPI({ authToken: '97f0ad9e24ca5e0408a269748d7fe0a0' });


        //Rest Service to Expose User profile.
        collectionApi.addCollection(UserProfile, 'users');

        //Rest Service to Expose Car profile.
        collectionApi.addCollection(CarProfile, 'cars');

        collectionApi.start();


    });
}