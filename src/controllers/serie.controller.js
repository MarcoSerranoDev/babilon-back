import Serie from "../models/Serie";

export const createSerie = async (req, res) => {
  const newSerie = new Serie(req.body);
  await newSerie.save();
  res.status(201).json("Serie created");
};

export const getSeries = async (req, res) => {
  const series = await Serie.find();
  res.status(200).json(series);
};

export const getSerieById = async (req, res) => {
  const { id } = req.params;
  try {
    const serieFind = await Serie.findById(id);
    res.status(200).json(serieFind);
  } catch (error) {
    console.log(error);
  }
};

export const updateSerieById = async (req, res) => {
  const { id } = req.params;
  try {
    await Serie.findByIdAndUpdate(id, req.body);
    res.status(200).json("Serie updated");
  } catch (error) {
    console.log(error);
  }
};

export const deleteSerieById = async (req, res) => {
  const { id } = req.params;
  try {
    await Serie.findByIdAndDelete(id, req.body);
    res.status(200).json("Serie deleted");
  } catch (error) {}
};
