const express = require('express');
const router = express.Router();

const { getEventById,getEvent,getAllEvents,createEvent, deleteAEvent} = require('../controllers/event')

router.param('eventId', getEventById);
router.get('/allevents', getAllEvents);
router.post('/event', createEvent);


router.get('/:eventId', getEvent);
router.delete('/:eventId', deleteAEvent);


module.exports = router;