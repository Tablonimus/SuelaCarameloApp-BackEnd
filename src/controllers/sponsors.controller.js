import Sponsor from "../models/sponsors.model.js";

export const getSponsors = async (req, res) => {
  try {
    const sponsors = await Sponsor.find();
    res.json(sponsors);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const createSponsor = async (req, res) => {
  const { name, logo, website, instagram, ubicacion } = req.body;

  try {
    const newSponsor = await Sponsor.create({
      name,
      logo,
      website,
      instagram,
      ubicacion,
    });

    res.status(201).json(newSponsor);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const deleteSponsor = async (req, res) => {
  const { id } = req.params;

  try {
    await Sponsor.findByIdAndDelete(id);
    res.json({ message: "Sponsor eliminado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
