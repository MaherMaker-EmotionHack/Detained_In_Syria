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
    origin_city: DataTypes.STRING,
    father_name: DataTypes.STRING,
    mother_name: DataTypes.STRING,
    nickname: DataTypes.STRING,
    date_of_loss: DataTypes.DATEONLY,
    last_known_place: DataTypes.STRING,
    last_home_address: DataTypes.TEXT,
    new_home_address: DataTypes.TEXT,
    last_photo: DataTypes.STRING,
    last_known_prison: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: "lost_detained",
    timestamps: false,
  }
);

export default LostDetained;
