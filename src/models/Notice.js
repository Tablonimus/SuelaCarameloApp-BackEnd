const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Notice",
    {
      title: {
        type: DataTypes.STRING,
      },

      subtitle: {
        type: DataTypes.STRING,
      },

      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      videos: {
        type: DataTypes.STRING,
      },

      content: {
        type: DataTypes.TEXT,
      },
      category: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: true }
  );
};
