var express = require('express');
const nodemon = require('nodemon');
var router = express.Router();
var sequelize = require('../db');
let validateSession = require('../middleware/validate-session');
var Animal = sequelize.import('../models/animal');

router.post("/create", validateSession, function (req, res) {
    const animalEntry = {
        name: req.body.animal.name,
        legNumber: req.body.animal.legNumber,
        predator: req.body.animal.predator,
        userId: req.user.id
    }
    Animal.create(animalEntry)
        .then(animal => res.status(200).json(animal))
        .catch(err => res.status(500).json({ error: err }))

});
router.get('/', validateSession, (req, res) => {
    Animal.findAll()
        .then(animals => res.status(200).json(animals))
        .catch(err => res.status(500).json({ error: err }))
});

router.put('/update/:entryId', validateSession, function (req, res) {
    const updateAnimalEntry = {
        name: req.body.animal.name,
        legNumber: req.body.animal.legNumber,
        predator: req.body.animal.predator,
    };

    const query = { where: { id: req.params.entryId, userId: req.user.id } };

    Animal.update(updateAnimalEntry, query)
        .then((animals) => res.status(200).json(animals))
        .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/delete/:id", validateSession, function (req, res) {
    const query = { where: { id: req.params.id, userId: req.user.id } };

    Animal.destroy(query)
        .then(() => res.status(200).json({ message: "Animals Entry Removed" }))
        .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;