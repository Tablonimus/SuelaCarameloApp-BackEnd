const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Match",
    {
      place: {
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.STRING,
      },
      time: {
        type: DataTypes.STRING,
      },
      local: {
        type: DataTypes.STRING,
      },
      visitor: {
        type: DataTypes.STRING,
      },
      local_score: {
        type: DataTypes.STRING,
        defaultValue: "0",
      },
      visitor_score: {
        type: DataTypes.STRING,
        defaultValue: "0",
      },
      category: {
        type: DataTypes.STRING,
      },
      finished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { timestamps: false }
  );
};
