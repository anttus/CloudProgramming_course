"use strict";
const pool = require("../../db/database"); // Separate database config file

// Returns a new promise that resolves the sql query results
async function getPromise(query) {
  return new Promise(async function(resolve) {
    let result = await pool.query(query);
    try {
      await resolve(result);
    } catch (err) {
      throw new Error(err);
    }
  }).catch(err => {
    throw new Error(err);
  });
}

//  GET /api/lists?userId=userId
exports.all_lists_of_user = async (req, res) => {
  let userId = req.query["userId"] || "null";
  let query =
    "SELECT * FROM Lists WHERE List_id IN (SELECT ListId FROM UserLists WHERE UserId = '" +
    userId +
    "');";
  getPromise(query, res).then(result => {
    res.send(result);
  });
};

// GET /api/lists/:id
exports.list_by_id = async (req, res) => {
  let listId = req.url.slice(11);
  let query = "SELECT * FROM Lists WHERE List_id = " + listId + ";";
  getPromise(query, res).then(result => {
    res.send(result);
  });
};

// PATCH /api/lists?listId=LIST_ID&newName=NEW_NAME
exports.list_name_change = async (req, res) => {
  let listId = req.query["listId"] || "null";
  let newName = req.query["newName"] || "null";
  let query =
    " UPDATE Lists SET Name = '" +
    newName +
    "' WHERE List_id = " +
    listId +
    ";";
  getPromise(query, res).then(result => {
    res.send(result);
  });
};

// PUT /api/lists/user?userId=USER_ID&listName=LIST_NAME
exports.create_list = async (req, res) => {
  let userId = req.query["userId"] || "null";
  let listName = req.query["listName"] || "null";
  let query1 =
    "INSERT INTO Lists (User_id, Name) VALUES ('" +
    userId +
    "', '" +
    listName +
    "');";
  getPromise(query1, res).then(result => {
    res.send(result);
    res.end();
    let query3 =
      "INSERT INTO UserLists (UserId, ListId) VALUES ('" +
      userId +
      "', (SELECT List_id FROM Lists WHERE User_id = '" +
      userId +
      "' AND Name = '" +
      listName +
      "'));";
    getPromise(query3, res).catch(err => {
      throw new Error(err);
    });
  });
};

// PUT /api/lists/users/shared?email=EMAIL&listId=LIST_ID
exports.share_list = async (req, res) => {
  let email = req.query["email"] || "null";
  let listIdOrig = req.query["listId"] || "null";
  let query =
    "INSERT INTO UserLists (UserId, ListId) VALUES ((SELECT User_id FROM Users WHERE email = '" +
    email +
    "'), (SELECT List_id FROM Lists WHERE List_id = '" +
    listIdOrig +
    "'));";
  getPromise(query, res).then(result => {
    res.send(result);
  });
};

// GET /api/listbyname?listName=LIST_NAME&userId=USER_ID
exports.get_list_by_name = async (req, res) => {
  let listName = req.query["listName"] || "null";
  let userId = req.query["userId"] || "null";
  let query =
    "SELECT List_id FROM Lists WHERE Name = '" +
    listName +
    "' AND User_id = '" +
    userId +
    "';";
  getPromise(query, res).then(result => {
    res.send(result);
  });
};

// GET /api/lists/users/shared?listId=LIST_ID
exports.get_shared_users = async (req, res) => {
  let listId = req.query["listId"] || "null";
  let query =
    "SELECT email FROM Users WHERE User_id IN (SELECT UserId FROM UserLists WHERE ListId = '" +
    listId +
    "');";
  getPromise(query, res).then(result => {
    res.send(result);
  });
};

// GET /api/items?listId=listId
exports.all_items_of_list = async (req, res) => {
  let listId = req.query["listId"] || "null";
  let query = "SELECT * FROM Items WHERE List_id = " + listId + ";";
  getPromise(query, res).then(result => {
    if (result == null) res.send("Empty");
    else res.send(result);
  });
};

// DELETE /api/lists/<LIST_ID>
// Deletes the list and every item on it
exports.delete_list = async (req, res) => {
  let listId = req.url.slice(11);
  let query1 = "DELETE FROM UserLists WHERE ListId = " + listId + ";";
  getPromise(query1, res).then(() => {
    let query2 = "DELETE FROM Items WHERE List_id = " + listId + ";";
    getPromise(query2, res).then(() => {
      let query3 = "DELETE FROM Lists WHERE List_id = " + listId + ";";
      getPromise(query3, res).then(() => {
        res.end();
      });
      res.end();
    });
    res.end();
  });
};

// Some method for checking if the item already exists in the list?
// PUT /api/items?name=<ITEM_NAME>&listId=<LIST_ID>
exports.add_item = async (req, res) => {
  let itemName = req.query["name"] || "null";
  let listId = req.query["listId"] || "null";
  let query =
    "INSERT INTO Items (Name, List_id) VALUES ('" +
    itemName +
    "', " +
    listId +
    ");";
  getPromise(query, res).then(result => {
    res.send(result);
  });
};

// PATCH /ap/items?itemId=ITEM_ID&newName=NEW_NAME
exports.item_name_change = async (req, res) => {
  let itemId = req.query["itemId"] || "null";
  let newName = req.query["newName"] || "null";
  let query =
    " UPDATE Items SET Name = '" +
    newName +
    "' WHERE Item_id = " +
    itemId +
    ";";
  getPromise(query, res).then(result => {
    res.send(result);
  });
};

// DELETE /api/items?listId=LIST_ID&itemId=ITEM_ID&itemName=ITEM_NAME
exports.delete_item = async (req, res) => {
  let listId = req.query["listId"] || "null";
  let itemId = req.query["itemId"] || "null";
  let itemName = req.query["itemName"] || "null";
  let query =
    "DELETE FROM Items WHERE List_id = " +
    listId +
    " AND Item_id = " +
    itemId +
    " AND Name = '" +
    itemName +
    "';";
  getPromise(query, res).then(result => {
    res.send(result);
  });
};

// GET /api/users
exports.get_users = async (req, res) => {
  let query = "SELECT * FROM Users;";
  getPromise(query, res).then(result => {
    res.send(result);
  });
};

// PUT /api/users?userId=<USER_ID>&email=<EMAIL>
exports.add_user = async (req, res) => {
  let userId = req.query["userId"] || "null";
  let email = req.query["email"] || "null";
  let query =
    " INSERT INTO Users (User_id, email) SELECT * FROM (SELECT '" +
    userId +
    "', '" +
    email +
    "') AS tmp WHERE NOT EXISTS (SELECT User_id FROM Users WHERE User_id = '" +
    userId +
    "');";
  getPromise(query, res).then(result => {
    res.send(result);
  });
};

// DELETE /api/users?userId=<USER_ID>
exports.delete_user = async (req, res) => {
  let userId = req.query["userId"] || "null";
  let query = "DELETE FROM Users WHERE User_id = '" + userId + "';";
  getPromise(query, res).then(result => {
    res.send(result);
  });
};

// PATCH /api/items/status?itemId=<ITEM_ID>&completed=<1/0>
exports.item_status = async (req, res) => {
  let itemId = req.query["itemId"] || "null";
  let completed = req.query["completed"] || "null";
  let query =
    "UPDATE Items SET Completed = '" +
    completed +
    "' WHERE Item_id = '" +
    itemId +
    "';";
  getPromise(query, res).then(result => {
    res.send(result);
  });
};

// GET /api/users/ifexists?email=<EMAIL>
exports.user_exists = async (req, res) => {
  let email = req.query["email"] || "null";
  let query = "SELECT COUNT(*) FROM Users WHERE email = '" + email + "';";
  getPromise(query, res).then(result => {
    res.send(result);
  });
};
