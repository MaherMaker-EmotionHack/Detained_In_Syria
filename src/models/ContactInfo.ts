import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class ContactInfo extends Model {}

ContactInfo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    detainee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    detainee_type: {
      type: DataTypes.ENUM("lost", "found"),
      allowNull: false,
    },
    contact_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
    },
    whatsapp: {
      type: DataTypes.STRING,
    },
    telegram: {
      type: DataTypes.STRING,
    },
    facebook: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    full_address: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    tableName: "contact_info",
    timestamps: false,
  }
);

export default ContactInfo;
