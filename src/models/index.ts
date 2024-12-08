import sequelize from "../config/database";
import LostDetained from "./LostDetained";
import FoundDetained from "./FoundDetained";

// Sync database
const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected!");
    await sequelize.sync({ alter: true });
    console.log("Models synchronized!");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

export { sequelize, LostDetained, FoundDetained, syncDatabase };
