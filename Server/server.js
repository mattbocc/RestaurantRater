require("dotenv").config()
//creates and initializes express app
const express = require("express")
const app = express()
const cors = require("cors")
const db = require("./db")

const morgan = require("morgan")
const port = 3000

app.use(cors())

//next sends the response to the next middleware/route
app.use(express.json())


/* GET METHODS
NOTE: Await expressions make promise-returning functions which behave as though they're synchronous by suspending execution until the returned promise is fulfilled or rejected.*/

//get all restaurants
app.get("/api/restaurants/", async (req, resp) =>{
    try {//need to utilize trycatch when using await
        const result = await db.query("SELECT * FROM restaurant;")   

        resp.status(200).json({
            status: "success",
            results: result.rows.length,
            data: {
                restaurant: result.rows
            }
        })

    } catch (error) {
        console.log(error)
    }


});
//get a specific restaurant deatils or reviews
app.get("/api/restaurants/:id", async (req, resp) =>{

    try {
        const details = await db.query(`SELECT * FROM restaurant where id = $1;`, [req.params.id])

        const reviews = await db.query(`SELECT * FROM rating where restaurant_id = $1;`, [req.params.id])

        const avgScorePull = await db.query('SELECT AVG(score) FROM rating where restaurant_id = $1;', [req.params.id])
        const avgScore = Number(avgScorePull.rows[0].avg).toFixed(2)

        resp.status(200).json({
            status: "success",
            data: {
                restaurant: details.rows[0],
                reviews: reviews.rows,
                score: avgScore
            }
        })

    } catch (error) {
        console.log(error)
    }

});



/*CREATE/UPDATE/DELETE METHODS*/

//creating a new restaurant (post method)
app.post("/api/restaurants/", async (req, resp) =>{
    try {
        const result = await db.query("INSERT INTO restaurant(name, location, address, type, price_range) VALUES ($1, $2, $3, $4, $5) returning *;", 
        [req.body.name, req.body.location, req.body.address, req.body.type, req.body.price_range])

        resp.status(201).json({
            status: "success",
            data:{
                restaurant: result.rows[0]
            },         
        })
    } catch (error) {
        console.log(error)
    }

});


app.delete("/api/restaurants/:id", async (req, resp) => {

    try {
        const deleteRating = await db.query("DELETE FROM rating WHERE restaurant_id = $1 returning *;",
        [req.params.id])

        const deleteRestaurant = await db.query("DELETE FROM restaurant WHERE id = $1 returning *;",
        [req.params.id])  
        
        resp.status(200).json({
            status: "success",
        })
    } catch (error) {
        console.log(error)
    }
});

app.post("/api/restaurants/:id/review", async (req, resp) => {
    try {
        const result = await db.query("INSERT INTO rating(restaurant_id, name, score, comment) VALUES($1, $2, $3, $4) returning *;",
        [req.params.id, req.body.name, req.body.score, req.body.comment])

        resp.status(201).json({
            status: "success",
            data: {
                review: result.rows[0]
            }
        })
    } catch (error) {
        console.log(error)
    }
});


app.listen(port, ()=> {
    console.log(`Port ${port} is up and running`)
});
