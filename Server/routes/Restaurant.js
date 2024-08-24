const express = require('express')
const Restaurant = require('../models/Restaurant')
require('dotenv').config()

const app = express()
app.use(express.json())

app.get('/restaurants', (req, res) => {
    Restaurant.find()
        .then((restaurant) => {
            res.status(200).send(restaurant)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
})

app.get('/restaurants/:id', (req, res) => {
    const { id } = req.params;

    Restaurant.findById(id)
        .then((restaurant) => {
            if (!restaurant) {
                return res.status(404).send({ message: "Restaurant not found." });
            }
            res.status(200).send(restaurant);
        })
        .catch((err) => {
            res.status(500).send({ message: "Error retrieving restaurant details.", error: err.message });
        });
});

module.exports = app;