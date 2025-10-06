const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Organizador = require("./Organizador"); // Importar el modelo Organizador

const Evento = sequelize.define(
  "Evento",
  {
    id_evento: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATEONLY, // Usar DATEONLY para no guardar la hora
      allowNull: false,
    },
    afiche: {
      type: DataTypes.STRING,
      allowNull: true, // Puede haber eventos sin afiche
    },
    id_organizador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Organizador,
        key: "id_organizador",
      },
    },
  },
  {
    tableName: "eventos",
    timestamps: false, // No añadir `createdAt` y `updatedAt`
  }
);

// Definir la asociación: un Evento pertenece a un Organizador
Evento.belongsTo(Organizador, {
  foreignKey: "id_organizador",
  as: "organizador",
});
Organizador.hasMany(Evento, { foreignKey: "id_organizador" }); // Opcional: un organizador tiene muchos eventos

module.exports = Evento;
