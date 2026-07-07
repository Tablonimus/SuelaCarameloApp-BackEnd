import Category from "../models/categories.model.js";

export const getCategories = async (req, res) => {
  try {
    const filter = {};
    if (req.query.enabled === "true") filter.enabled = true;
    const categories = await Category.find(filter).sort({ order: 1, label: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCategory = async (req, res) => {
  const { value, label, order } = req.body;

  if (!value || !label) {
    return res.status(400).json({ message: "value y label son obligatorios" });
  }

  try {
    const existing = await Category.findOne({ value: value.trim() });
    if (existing) {
      return res.status(409).json({ message: `Ya existe una categoría con value "${value.trim()}"` });
    }

    const newCategory = await Category.create({
      value: value.trim(),
      label: label.trim(),
      order: order ?? 0,
    });

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { label, order, enabled } = req.body;

  const update = {};
  if (label   !== undefined) update.label   = label.trim();
  if (order   !== undefined) update.order   = Number(order);
  if (enabled !== undefined) update.enabled = Boolean(enabled);

  try {
    const category = await Category.findByIdAndUpdate(
      id,
      update,
      { new: true, runValidators: true }
    );
    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
