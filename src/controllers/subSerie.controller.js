import SubSerie from '../models/SubSerie';

export const createSubSerie = async (req, res) => {
  try {
    const newSubSerie = new SubSerie(req.body);
    await newSubSerie.save();

    res.status(201).json('Sub serie created');
  } catch (error) {
    console.log(error.message);
  }
};

export const getSubSeries = async (req, res) => {
  try {
    const query = req.query;

    const fetchSubSeries = await SubSerie.find({ ...query }).populate(
      'models',
      'modelo slug subModelImg',
    );

    res.status(200).json(fetchSubSeries);
  } catch (error) {
    console.log(error.message);
  }
};

export const updateSubSerie = async (req, res) => {
  try {
    const { id } = req.params;

    const subSerieUpdate = await SubSerie.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!subSerieUpdate) {
      return res.status(404).json('sub serie no encontrada');
    }

    res.json(subSerieUpdate);
  } catch (error) {
    console.log(error.message);
  }
};
