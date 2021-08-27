const Subscriber = require('../models/subscriber');

async function init(req, res, next) {
    let subscriber;
    try {
        subscriber = await Subscriber.findById(req.params.id);
        if (subscriber === null) {
            return res.status(404).json({ message: "Cannot find subsciber" });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
    res.subscriber = subscriber;
    next();
}

module.exports = init;