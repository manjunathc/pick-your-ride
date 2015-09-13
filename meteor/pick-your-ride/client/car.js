if (Meteor.isClient) {

Template.body.helpers({
  cars: function()
  {
    return Cars.find({}, {sort: {createdAt: -1}});
  }
});

Template.body.events({


  "submit .new-car": function(event)
  {
    // Prevent default browser form submit
      event.preventDefault();

      //Get Value from the Car Body Form
    var vin= event.target.vin.value;
    var make= event.target.make.value;
    var model= event.target.model.value;
    var year= event.target.year.value;
    var trim= event.target.trim.value;

//Insert Data in to Cars Mongo Collection

    Cars.insert({
    "vin": vin,
    "make": make,
    "model": model,
    "year": year,
    "trim": trim})
    // Clear form
      event.target.vin.value = "";
        event.target.make.value = "";
          event.target.model.value = "";
            event.target.year.value = "";

  }
}
)
}
