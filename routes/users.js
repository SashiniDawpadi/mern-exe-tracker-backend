const router = require('express').Router();
const Exercise = require('../models/exercise.model');
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('error : ' + err));
})


router.route('/add').post((req, res) => {
    const username = req.body.username;
    const newUser = new User({ username })
    
    newUser.save()
        .then(() => res.json('User added successfully'))
        .catch(err => res.status(400).json('error:' +err))
})

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(exercise => res.json(exercise))
    . catch(err => res.status(400).json('Error',  +err))    
})

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted'))
    . catch(err => res.status(400).json('Error',  +err))    
})

router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('Exercise updated successfully'))
            .catch(err => res.status(400).json('Error' + err))
        })
    .catch(err => res.status(400).json('Error' + err))
})


module.exports = router