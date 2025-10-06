const { Sequelize } = require("sequelize");

// Inicializar Sequelize con la URL de la base de datos desde el .env
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  timezone: "-05:00",
  dialectOptions: {
    // Necesario para algunas configuraciones de hosting como Render que requieren SSL
    ssl: process.env.DATABASE_URL.includes("render.com")
      ? {
          require: true,
          rejectUnauthorized: false,
        }
      : false,
  },
  logging: false, // Desactiva los logs de SQL en la consola
});

module.exports = sequelize;
