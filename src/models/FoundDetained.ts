import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class FoundDetained extends Model {}

FoundDetained.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    dob: DataTypes.DATEONLY,
    father_name: DataTypes.STRING,
    mother_name: DataTypes.STRING,
    nickname: DataTypes.STRING,
    date_of_freedom: DataTypes.DATEONLY,
    place_last_seen: DataTypes.STRING,
    current_stay_address: DataTypes.TEXT,
    next_address: DataTypes.TEXT,
    last_photo: DataTypes.STRING,
    prison_name: DataTypes.STRING,
    origin_admin1_en: DataTypes.STRING,
    origin_admin1_ar: DataTypes.STRING, 
    origin_admin2_en: DataTypes.STRING,
    origin_admin2_ar: DataTypes.STRING,
    origin_admin3_en: DataTypes.STRING,
    origin_admin3_ar: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM("dead", "alive", "alive_but_hurt", "missing"),
      allowNull: false,
      defaultValue: "alive",
    },
  },
  {
    sequelize,
    tableName: "found_detained",
    timestamps: false,
  }
);

export default FoundDetained;
