import Coupon from "../models/coupons.model.js";

export const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const createCoupon = async (req, res) => {
  const { name, logo, terminos, descuento, telefono, ubicacion } = req.body;

  try {
    const newCoupon = await Coupon.create({
      name,
      logo,
      terminos,
      descuento,
      telefono,
      ubicacion,
    });

    res.status(201).json(newCoupon);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const deleteCoupon = async (req, res) => {
  const { id } = req.params;

  try {
    await Coupon.findByIdAndDelete(id);
    res.json({ message: "Cupón eliminado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
