module.exports = (sequelize, DataTypes) =>
  sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },

    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [7, 255],
      },
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      defaultValue: DataTypes.NOW,
    },

    role: {
      type: DataTypes.STRING,
    },
  });
