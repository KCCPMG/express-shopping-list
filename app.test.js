process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("./app")
const items = require("./fakeDb")


beforeEach(function() {
  items.push(
    {
      name: "new_popsicle",
      price: 2.45
    }
  )
})

afterEach(function() {
  items.splice(0, items.length);
})


describe("GET /items", function() {

  test("get all items", async function(){

    const resp = await request(app).get('/items');

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([{
      "name": "new_popsicle",
      "price": 2.45
    }])

  })

})


describe("POST /items", function(){

  test("POST valid", async function(){
    const resp = await request(app).post('/items').send({
      name: "steak-umm",
      price: 4.50
    });

    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
      "added": {
        "name": "steak-umm",
        "price": "4.5"
      }
    })    

  })


  test("POST invalid", async function() {
    const resp = await request(app).post('/items').send({
      name: "steak-umm"
    });

    expect(resp.statusCode).toBe(400);
    expect(resp.body).toEqual("Invalid item");

  })

})


describe("GET /items/:name", function(){

  test("GET valid", async function(){
    const resp = await request(app).get('/items/new_popsicle')

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      "name": "new_popsicle",
      "price": 2.45
    })

  })


  test("GET invalid", async function(){
    const resp = await request(app).get('/items/new_popsickle')

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual("Item not found")

  })

})


describe("PATCH /items/:name", function(){

  test("PATCH valid", async function(){
    const resp = await request(app).patch('/items/new_popsicle').send({
      name: "ham",
      price: 10
    })

    expect(resp.statusCode).toBe(200);
    expect(items).toEqual([{
      name: "ham",
      price: 10
    }])

  })

  test("PATCH invalid", async function(){
    const resp = await request(app).patch('/items/old_popsicle').send({
      name: "ham",
      price: 10
    })

    expect(resp.statusCode).toBe(400);
    expect(resp.body).toBe("Item not found");

  })

})


describe("DELETE /items/:name", function(){

  test("DELETE valid", async function(){
    const resp = await request(app).delete('/items/new_popsicle')

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toStrictEqual({message: "Deleted"});

  })

  test("DELETE invalid", async function(){
    const resp = await request(app).patch('/items/old_popsicle')

    expect(resp.statusCode).toBe(400);
    expect(resp.body).toBe("Item not found");

  })
})