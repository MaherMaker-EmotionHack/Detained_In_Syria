import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class LostDetained extends Model {}

LostDetained.init(
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
    date_of_loss: DataTypes.DATEONLY,
    last_known_place: DataTypes.STRING,
    last_home_address: DataTypes.TEXT,
    new_home_address: DataTypes.TEXT,
    last_photo: DataTypes.STRING,
    last_known_prison: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM("dead", "alive", "alive_but_hurt", "missing"),
      allowNull: false,
      defaultValue: "alive",
    },
    origin_admin1_en: DataTypes.STRING,
    origin_admin1_ar: DataTypes.STRING,
    origin_admin2_en: DataTypes.STRING,
    origin_admin2_ar: DataTypes.STRING,
    origin_admin3_en: DataTypes.STRING,
    origin_admin3_ar: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: "lost_detained",
    timestamps: false,
  }
);

export default LostDetained;
