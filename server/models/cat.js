import { Model, Op } from 'sequelize';

export default function (sequelize, DataTypes) {
  class Cat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cat.init(
    {
      Breed: DataTypes.STRING,
      MinYears: DataTypes.INTEGER,
      MaxYears: DataTypes.INTEGER,
      Environment: DataTypes.STRING,
      Personality: DataTypes.TEXT,
      Image: DataTypes.STRING,
      Image2: DataTypes.STRING,
      Image3: DataTypes.STRING,
      Image4: DataTypes.STRING,
      Color1: DataTypes.STRING,
      Color2: DataTypes.STRING,
      Color3: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Cat',
    }
  );
  return Cat;
}
