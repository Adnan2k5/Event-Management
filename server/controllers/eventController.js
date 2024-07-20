const Event = require('../models/EventModel');

exports.getEvent = async (req, res) => {
  try {
    const events = await Event.find({ user: req.user.id });
    res.json(events);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server error");
  }
};

exports.createEvent = async (req, res) => {
  const { title, description, date } = req.body;
  console.log(req.user.id);
  try {
    const newEvent = await Event.create({
      title: title,
      description: description,
      date: date,
      user: req.user.id

    })
    res.json(newEvent);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server error");
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json("Event not found");
    }
    if (event.user.id.toString() !== req.user.id) {
      return res.status(401).json("User not Authorized");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error");
  }
};

exports.updateEvent = async (req, res) => {
  const { title, description, date } = req.body;
  try {
    let event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json("Event not Found");
    }
    if (event.user.toString() !== req.user.id) {
      return res.status(401).json("User not Authorized");
    }
    event = await Event.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title,
          description,
          date,
        },
      },
      { new: true }
    );
    res.json(event);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error");
  }
};
