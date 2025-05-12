import Event from '../models/Event';

export const createEvent = async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json('Product created');
  } catch (error) {
    console.log(error);
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ ...req.query, isDeleted: false });
    res.json(events);
  } catch (error) {
    console.log(error);
  }
};

export const getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const eventFind = await Event.findById(id);
    res.status(200).json(eventFind);
  } catch (error) {
    console.log(error);
  }
};

export const updateEventById = async (req, res) => {
  const { id } = req.params;
  try {
    await Event.findByIdAndUpdate(id, req.body);
    res.status(200).json('Product updated');
  } catch (error) {
    console.log(error);
  }
};

export const deleteEventById = async (req, res) => {
  const { id } = req.params;
  try {
    await Event.findByIdAndDelete(id);
    res.status(200).json('Product deleted');
  } catch (error) {
    console.log(error);
  }
};
