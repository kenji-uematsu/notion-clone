import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import bcrypt from "bcrypt";

class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // usernameフィールドを削除
  },
  {
    sequelize,
    modelName: "User",
  }
);

// パスワードハッシュのフック
User.beforeCreate(async (user: any) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

export default User;
