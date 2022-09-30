const express = require ('express');
const router = express.Router();
const items = require('./fakeDb');


router.get('/', (req, res) => {
  return res.json(items);
})


router.post('/', (req, res) => {

  if (typeof(req.body?.name) == "string" && typeof(req.body?.price) == "number") {
    const newItem = {
      name: req.body.name,
      price: req.body.price
    };

    items.push(newItem);

    return res.status(201).json({
      added: {
        "name": newItem.name,
        "price": String(newItem.price)
      }
    });
  } else {
    res.status(400).json("Invalid item")
  }

})


router.get('/:name', (req, res) => {
  console.log(req.params);
  console.log(req.params.name);
  let foundItem = items.find(item => item.name == req.params.name);
  if (foundItem) {
    return res.json(foundItem);
  } else {
    return res.json("Item not found");
  }
})


router.patch('/:name', (req, res) => {
  let foundItem = items.find(item => item.name == req.params.name);
  if (!foundItem) {
    return res.status(400).json("Item not found");
  } else {
    if (typeof(req.body?.name) == "string" && typeof(req.body?.price) == "number") {
      foundItem.name = req.body.name;
      foundItem.price = req.body.price;
      return res.json({
        "updated": {
          "name": foundItem.name,
          "price": foundItem.price
        }
      })
    } else {
      return res.status(400).json("Invalid item");
    }
  }
})


router.delete('/:name', (req, res) => {
  let foundIndex = items.findIndex(item => item.name == req.params.name);
  if (foundIndex == -1) {
    return res.status(400).json("Item not found");
  } else {
    items.splice(foundIndex, 1);
    res.json({
      message: "Deleted"
    })
  }
})

// using a function in case of refactor to set globals in nameRouter.js from app.js
module.exports = () => {
  return router;
};