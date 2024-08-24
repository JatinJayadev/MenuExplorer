const express = require('express')
const crypto = require('crypto')
const User = require('../models/User')

require('dotenv').config()

const app = express()
app.use(express.json())

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = hashPassword(password)

    User.create({
        name, email, password: hashedPassword, roles: 'user'
    }).then((result) => {
        res.status(201).send(result)
    }).catch((err) => {
        res.status(500).send(err)
    })
})

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email }).then((user) => {
        if (!user) {
            return res.status(401).json({ message: 'Invalid Credentials' })
        }

        const plainText = hashPassword(password)

        if (plainText == user.password) {
            return res.status(201).send({ message: 'Logged In Successfully', data: user })
        } else {
            return res.status(401).send({ message: 'Invalid Credentials' })
        }
    }).catch((err) => {
        res.status(500).send(err)
    })
})

module.exports = app;