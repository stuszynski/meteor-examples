// Publish complete set of lists to all clients.
Meteor.publish('lists', function () {
  return Lists.find();
});

// Publish all items for requested list_id.
Meteor.publish('todos', function (list_id) {
  return Todos.find({list_id: list_id});
});
