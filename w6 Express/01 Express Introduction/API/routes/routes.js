"use strict";
const basicAuth = require("express-basic-auth");

module.exports = function(app) {
  const controller = require("../restController");

  // app.use(basicAuth({
  //     users: { 'rest.api': 'supersecret123' }
  // }));

  // GET /api/lists?userId=USER_ID
  // PATCH /api/lists?listId=LIST_ID&newName=NEW_NAME
  // PUT /api/lists?userId=USER_ID&listName=LIST_NAME
  app
    .route("/api/lists")
    .get(controller.all_lists_of_user)
    .patch(controller.list_name_change)
    .put(controller.create_list);

  // PUT /api/lists/users/shared?email=EMAIL&listId=LIST_ID
  // GET /api/lists/users/shared?listId=LIST_ID
  app
    .route("/api/lists/users/shared")
    .put(controller.share_list)
    .get(controller.get_shared_users);

  // GET /api/lists/LIST_ID
  // DELETE /api/lists/LIST_ID
  app
    .route("/api/lists/:id")
    .get(controller.list_by_id)
    .delete(controller.delete_list);

  // GET /api/items?listId=LIST_ID
  // PUT /api/items?name=ITEM_NAME&list_id=LIST_ID
  // PATCH /ap/items?itemId=ITEM_ID&newName=NEW_NAME
  // DELETE /api/items?listId=LIST_ID&itemId=ITEM_ID
  app
    .route("/api/items")
    .get(controller.all_items_of_list)
    .put(controller.add_item)
    .patch(controller.item_name_change)
    .delete(controller.delete_item);

  // PATCH /api/items/status?itemId=ITEM_ID&completed=1/0
  app.route("/api/items/status").patch(controller.item_status);

  // GET /api/users
  // PUT /api/users?userId=USER_ID&email=EMAIL
  // DELETE /api/users?userId=USER_ID
  app
    .route("/api/users")
    .get(controller.get_users)
    .put(controller.add_user)
    .delete(controller.delete_user);

  // GET /api/users/ifexists?email=<EMAIL>
  app.route("/api/users/ifexists").get(controller.user_exists);

  // GET /api/listByName?listName=LIST_NAME&userId=USER_ID
  app.route("/api/listbyname").get(controller.get_list_by_name);
};
