const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Organizador = sequelize.define(
  "Organizador",
  {
    id_organizador: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "organizadores",
    timestamps: false, // No añadir `createdAt` y `updatedAt`
  }
);

module.exports = Organizador;
