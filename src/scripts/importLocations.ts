import { readFileSync } from "fs";
import { parse } from "papaparse";
import Location from "../models/Location";
import sequelize from "../config/database";

const importLocations = async () => {
  try {
    // Path to the CSV file
    
    const csvPath =
      "/home/mahermaker/Dev/detained_in_syria/Detained_In_Syria/src/data/location.csv";
    const csvData = readFileSync(csvPath, "utf-8");

    // Parse CSV data
    const { data } = parse(csvData, { header: true });

    // Filter and map relevant columns
    const locations = data.map((row: any) => ({
      admin1_name_en: row.admin1Name_en,
      admin1_name_ar: row.admin1Name_ar,
      admin2_name_en: row.admin2Name_en,
      admin2_name_ar: row.admin2Name_ar,
      admin3_name_en: row.admin3Name_en,
      admin3_name_ar: row.admin3Name_ar,
    }));

    // Bulk insert data into the database
    await Location.bulkCreate(locations);
    console.log("Locations imported successfully!");
  } catch (error) {
    console.error("Error importing locations:", error);
  }
};

// Run the import script
sequelize.sync({ alter: true }).then(() => importLocations());
