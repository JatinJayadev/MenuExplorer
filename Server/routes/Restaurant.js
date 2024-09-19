const express = require('express')
const Restaurant = require('../models/Restaurant')
require('dotenv').config()

const authenticateToken = require('../middleware/auth')


const app = express()
app.use(express.json())

app.get('/restaurants', authenticateToken, (req, res) => {
    Restaurant.find()
        .then((restaurant) => {
            res.status(200).send(restaurant)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
})

app.post('/addRestaurant', authenticateToken, (req, res) => {
    const { name, ownerName, mobileNumber, menu } = req.body;

    Restaurant.create({
        name, ownerName, mobileNumber,
        menu: {
            breakfast: menu.breakfast,
            lunch: menu.lunch,
            dinner: menu.dinner
        }
    })
        .then((restaurant) => {
            res.status(201).json({ message: 'Restaurant created!!', restaurant: restaurant });
        })
        .catch((err) => {
            res.status(500).json(err)
        });
});

app.get('/restaurants/:id', authenticateToken, (req, res) => {
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

app.put('/updateRestaurant/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const { name, ownerName, mobileNumber, menu } = req.body;

    Restaurant.findByIdAndUpdate(id, { name, ownerName, mobileNumber, menu: { breakfast: menu.breakfast, lunch: menu.lunch, dinner: menu.dinner } })
        .then((updatedRestaurant) => {
            if (!updatedRestaurant) {
                return res.status(404).json({ message: 'Restaurant not found' });
            }
            res.status(200).json({ message: 'Restaurant updated successfully', restaurant: updatedRestaurant });
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error updating restaurant', error: err.message });
        });
});

module.exports = app;