const router = require('express').Router();
let Poll = require('../models/poll.model');

router.route('/').get((req, res) => {
    Poll.find()
        .then(polls => res.json(polls))
        .catch(err => res.status(400).json('Error: '+ err))
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const voterCount = Number(req.body.voterCount);
    const options = req.body.options;
    const date = Date.parse(req.body.date);
    const isAnonymous = req.body.isAnonymous;

    const newPoll = new Poll({
        username,
        description,
        voterCount,
        options,
        date,
        isAnonymous
    });

    newPoll.save()
        .then(() => res.json('Poll added!'))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').get((rep,res) => {
    Poll.findById(rep.params.id)
        .then((poll) => res.json(poll))
        .catch(err => res.status(400).json('Error: '+ err));
});
router.route('/:id').delete((rep,res) => {
    Poll.findByIdAndDelete(rep.params.id)
        .then(() => res.json('Poll deleted'))
        .catch(err => res.status(400).json('Error: '+ err));
});
router.route('/update/:id').post((req,res) => {
    Poll.findById(req.params.id)
        .then((poll) => {
            poll.username = req.body.username; 
            poll.description = req.body.description;
            poll.voterCount = Number(req.body.voterCount);
            poll.options = req.body.options;
            poll.date = Date.parse(req.body.date); 
            poll.isAnonymous = req.body.isAnonymous;

        poll.save()
            .then(() => res.json('Poll updated!'))
            .catch(err => res.status(400).json('Error: '+ err));
        })
        .catch(err => res.status(400).json('Error: '+ err));
});

module.exports = router;