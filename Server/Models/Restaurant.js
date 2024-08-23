const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    menu: {
        breakfast: {
            type: [String],
            required: false
        },
        lunch: {
            type: [String],
            required: false
        },
        dinner: {
            type: [String],
            required: false
        }
    }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
