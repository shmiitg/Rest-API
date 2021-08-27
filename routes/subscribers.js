const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');
const subsciberMiddleware = require('../middlewares/subscriber');

router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.json(subscribers);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get('/:id', subsciberMiddleware, (req, res) => {
    res.json(res.subscriber);
})

router.delete('/:id', subsciberMiddleware, async (req, res) => {
    try {
        await res.subscriber.remove();
        res.json({ message: "Successfully deleted subscriber" })
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
})

router.patch('/:id', subsciberMiddleware, async (req, res) => {
    if (req.body.name !== null) {
        res.subscriber.name = req.body.name;
    }
    if (req.body.subscribedToChannel !== null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
    }
    try {
        const updatedSubsciber = await res.subscriber.save();
        res.json(updatedSubsciber);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.post('/', (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel,
        subscribeDate: req.body.subscribeData
    })
    subscriber.save()
        .then(() => res.status(201).json(subscriber))
        .catch(err => res.status(400).json({ err: err.message }))
})


module.exports = router;