Router.map(function () {

  this.route('home', {
    path: '/',  //overrides the default '/home'
  });
  this.route('carProfile',{
    path:'/cars',
  });

});
