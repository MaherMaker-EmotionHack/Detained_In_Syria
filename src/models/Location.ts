import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Location extends Model {}

Location.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    admin1_name_en: {
      type: DataTypes.STRING,
    },
    admin1_name_ar: {
      type: DataTypes.STRING,
    },
    admin2_name_en: {
      type: DataTypes.STRING,
    },
    admin2_name_ar: {
      type: DataTypes.STRING,
    },
    admin3_name_en: {
      type: DataTypes.STRING,
    },
    admin3_name_ar: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: "locations",
    timestamps: false,
  }
);

export default Location;
