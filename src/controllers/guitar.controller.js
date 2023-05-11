import Guitar from "../models/Guitar";
export const getGuitars = async (req, res) => {
  const guitarsFounded = await Guitar.find();
  res.status(200).json(guitarsFounded);
};

export const getGuitarById = async (req, res) => {
  const { id } = req.params;
  try {
    const productFind = await Guitar.findById(id);
    res.status(200).json(productFind);
  } catch (error) {
    console.log(error);
  }
};

export const createGuitar = async (req, res) => {
  try {
    const newGuitar = new Guitar(req.body);
    await newGuitar.save();
    res.status(200).json("Guitar created");
  } catch (error) {
    console.log(error);
  }
};

export const updateGuitarById = async (req, res) => {
  const { id } = req.params;
  try {
    await Guitar.findByIdAndUpdate(id, req.body);
    res.status(200).json("Product updated");
  } catch (error) {
    console.log(error);
  }
};

export const deleteGuitarById = async (req, res) => {
  const { id } = req.params;
  try {
    await Guitar.findByIdAndDelete(id);
    res.status(200).json("Guitar deleted");
  } catch (error) {
    console.log(error);
  }
};
