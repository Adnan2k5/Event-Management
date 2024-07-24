const express = require("express");
const router = express.Router();
const auth = require("../middlewares/tokenauth");
const { getEvent, createEvent, updateEvent, deleteEvent } = require("../controllers/eventController");








//Get Events
router.post('/get', getEvent);


//Post Events
router.post('/', createEvent);


//Update Events
router.put('/:id', auth, updateEvent);

//Delete Events
router.delete('/:id', auth, deleteEvent );

module.exports = router;