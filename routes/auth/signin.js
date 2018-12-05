const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../../db');

router.post('/', (req, res) => {

    if (!req.body) {
        res.status(401).render('error', {data: {message: "Invalid username or password!"}});
        return;
    }
    db.findUser({username: req.body.username}, (err, user) => {

        if (!user || bcrypt.compareSync(req.body.password, user.password)) {
            res.status(401).render('error', {data: {message: "Invalid username or password!"}});
            return;
        }
        const token = jwt.sign({id: user._id}, process.env.SECRET, {
            expiresIn: 300
        });
        res.status(200).render('token', {data: {token}});

    });
});

module.exports = router;