exports.post = (res, req, next) => {
    res.status(500);
};

exports.get = (req, res, next) => {
    const test = {
        name: 'Orclord',
        image: 'https://opengameart.org/sites/default/files/Orc_ani_run008.png',
        strength: 0.9,
        defense: 0.7,
        agility: 0.2,
        intelligence: 0.9,
    };
    res.render('character', {
        data: test
    });
};

exports.delete = (res, req, next) => {
    res.status(500);
};

exports.put = (res, req, next) => {
    res.status(500);
};

