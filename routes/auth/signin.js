const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/', (req, res, next) => {

    if (req.body && req.body.username === 'test@example.com' && req.body.password === "123") {
        const id = 1;
        const token = jwt.sign({id}, process.env.SECRET, {
            expiresIn: 300
        });
        res.status(200).send({auth: true, token: token});
        return;
    }
    res.status(500).send("Invalid username or password!");
});

module.exports = router;