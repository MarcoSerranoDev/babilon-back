import Artist from '../models/Artist';

export const updateOrder = async (req, res) => {
  try {
    const artists = await Artist.find({ isDeleted: false }).sort({
      order: 1,
      updatedAt: -1,
    });

    for (let i = 0; i < artists.length; i++) {
      await Artist.findOneAndUpdate(
        { name: artists[i].name },
        { order: i + 1 }
      );
    }

    res.status(200).send('ok');
  } catch (error) {
    console.log(error.message);
  }
};
