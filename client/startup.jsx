Meteor.startup(function () {
  // Use Meteor.startup to render the component after the page is ready
  injectTapEventPlugin();
  React.render(<App />, document.getElementById("app"));
});

Meteor.subscribe("themes");
