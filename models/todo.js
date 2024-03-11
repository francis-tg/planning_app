"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Todo extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.User, {
				foreignKey: "user_id",
				onDelete: "CASCADE",
			});
		}
	}
	Todo.init(
		{
			user_id: DataTypes.INTEGER,
			label: DataTypes.STRING,
			description: DataTypes.STRING,
			date: DataTypes.DATE,
			closed: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: "Todo",
		},
	);
	return Todo;
};
