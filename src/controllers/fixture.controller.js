import Fixture from "../models/fixture.model.js";

export const getFixtures = async (req, res) => {
  const Fixtures = await Fixture.find();
  res.json(Fixtures);
};

export const getFixtureById = async (req, res) => {
  const fixture = await Fixture.findById(req.params.id);
  res.json(fixture);
};

export const createFixture = async (req, res) => {
  const { number, image, is_Active, category } = req.body;

  const updatedFixture = await Fixture.findOneAndUpdate(
    { number: number, category: category },
    { number, image, is_Active, category },
    { new: true }
  );
  if (updatedFixture) {
    res.json(updateFixture);
  } else {
    const newFixture = await Fixture.create({
      number,
      image,
      is_Active,
      category,
    });

    res.json(newFixture);
  }
};

export const deleteFixture = async (req, res) => {
  const Fixture = await Fixture.findByIdAndDelete(req.params.id);
  if (!Fixture) return res.status(404).json({ message: "Fixture not found" });
  res.sendStatus(204);
};

export const updateFixture = async (req, res) => {
  const Fixture = await Noticia.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!Fixture) return res.status(404).json({ message: "Fixture not found" });
  res.json(noticia);
};
