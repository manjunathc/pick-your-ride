if (Meteor.isClient) {

   //Return the Car profile stored in CarProfile collection
    Template.carProfile.helpers({

        cars: function()
        {

            return CarProfile.find({}, {sort: {createdAt: -1}});
        }


    });

    //Add car profiles to CarProfile collection

    Template.carForm.events({


            "submit .new-car": function(event)
            {
                // Prevent default browser form submit
                event.preventDefault();
                console.log("inside console");

                //Get Value from the Car Body Form
                var vin= event.target.vin.value;
                var make= event.target.make.value;
                var model= event.target.model.value;
                var year= event.target.year.value;
                var trim= event.target.trim.value;
                var email= event.target.email.value;

                //Insert Data in to Cars Mongo Collection

                CarProfile.insert({
                    "vin": vin,
                    "make": make,
                    "model": model,
                    "year": year,
                    "trim": trim,
                "email":email
                })

                // Clear form
                event.target.vin.value = "";
                event.target.make.value = "";
                event.target.model.value = "";
                event.target.year.value = "";
                event.target.trim.value = "";
                event.target.email.value = "";

            }
        }
    )
}