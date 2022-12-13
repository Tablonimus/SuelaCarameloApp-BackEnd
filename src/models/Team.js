const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Team",
    {
      name: {
        type: DataTypes.STRING,
      },

      short_name: {
        type: DataTypes.STRING,
      },

      logo: {
        type: DataTypes.STRING,
      },

      place: {
        type: DataTypes.STRING,
      },
      category: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
