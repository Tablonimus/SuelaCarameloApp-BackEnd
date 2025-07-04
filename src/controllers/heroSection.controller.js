import HeroImage from "../models/heroSection.model.js";

export const getHeroImages = async (req, res) => {
  try {
    // Opcional: filtrar por dispositivo o estado activo
    const { deviceType, active } = req.query;
    const filter = {};

    if (deviceType) filter.deviceType = deviceType;
    if (active) filter.isActive = active === "true";

    const images = await HeroImage.find(filter).sort({ order: 1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getHeroImageById = async (req, res) => {
  try {
    const image = await HeroImage.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Hero image not found" });
    }
    res.json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createHeroImage = async (req, res) => {
  try {
    const newImage = await HeroImage.create(req.body);
    res.status(201).json(newImage);
  } catch (error) {
    console.log(error);

    res.status(400).json({ error: error.message });
  }
};

export const updateHeroImage = async (req, res) => {
  try {
    const updatedImage = await HeroImage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedImage) {
      return res.status(404).json({ message: "Hero image not found" });
    }

    res.json(updatedImage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteHeroImage = async (req, res) => {
  try {
    const deletedImage = await HeroImage.findByIdAndDelete(req.params.id);

    if (!deletedImage) {
      return res.status(404).json({ message: "Hero image not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
