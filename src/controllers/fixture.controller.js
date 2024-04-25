import Fixture from "../models/fixture.model.js";

export const getFixtures = async (req, res) => {
  try {
    const { category = "A1" } = req.query;
    console.log(category);

    const fixtures = await Fixture.find({ category: category });
    const activeFixture = fixtures
      .reverse()
      .find((fixture) => fixture.is_Active);
    console.log(activeFixture.number);
    res.json({ fixtures, activeNumber: activeFixture?.number || 1 });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: error.message });
  }
};

export const getFixtureById = async (req, res) => {
  const fixture = await Fixture.findById(req.params.id);
  res.json(fixture);
};

export const createFixture = async (req, res) => {
  try {
    const { number, image, is_Active, category } = req.body;

    const allFixtures = await Fixture.find({ category: category });

    for (let i = 0; i < allFixtures.length; i++) {
      const element = allFixtures[i];
      const fixture = await Fixture.findById(element._id);
      fixture.is_Active = false;
      fixture.save();
    }

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
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", message: error.message });
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
