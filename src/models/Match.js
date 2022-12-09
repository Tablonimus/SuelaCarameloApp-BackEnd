const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Match",
    {
      team1: {
        type: DataTypes.STRING,
      },

      team2: {
        type: DataTypes.STRING,
      },

      place: {
        type: DataTypes.STRING,
      },

      score1: {
        type: DataTypes.STRING,
      },
      score2: {
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
