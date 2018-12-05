const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../../db');


router.post('/', (req, res) => {
    db.findUser({username: req.body.username}, (err, user) => {
        if (err) {
            console.error(err);
            return;
        }

        if (user) {
            res.status(409).render('error', {
                data: {
                    message: "User already exists"
                }
            });
            return;
        }

        var hash = bcrypt.hashSync(req.body.password, 10);
        db.addUser({username: req.body.username, password: hash}, (err) => {
            if (err) throw err;
        });

    });
});

module.exports = router;