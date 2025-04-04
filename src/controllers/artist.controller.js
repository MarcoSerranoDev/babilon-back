import Artist from '../models/Artist';

export const createArtist = async (req, res) => {
  try {
    const newArtist = new Artist(req.body);
    await newArtist.save();
    res.status(200).json({ message: 'Artist created' });
  } catch (error) {
    console.log(error);
  }
};

export const getArtists = async (req, res) => {
  try {
    const artists = await Artist.find({ isDeleted: false });

    // orden
    artists.sort((a, b) => b.order - a.order);

    res.status(200).json(artists);
  } catch (error) {
    console.log(error);
  }
};

export const getArtistById = async (req, res) => {
  const { id } = req.params;
  try {
    const artistFound = await Artist.findById(id);
    res.status(200).json(artistFound);
  } catch (error) {
    console.log(error);
  }
};

export const updateArtistById = async (req, res) => {
  const { id } = req.params;
  try {
    const artistUpdated = await Artist.findByIdAndUpdate(id, req.body);
    res.status(200).json({ message: `Artist ${artistUpdated.name} updated` });
  } catch (error) {
    console.log(error);
  }
};

export const deleteArtistById = async (req, res) => {
  const { id } = req.params;
  try {
    await Artist.findByIdAndDelete(id);
    res.status(200).json({ message: 'user deleted' });
  } catch (error) {
    console.log(error);
  }
};
