module.exports = (sequelize, DataTypes) =>
  sequelize.define('post', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
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

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [0, 255],
      }
    },

    body: {
      type: DataTypes.JSONB,
      allowNull: false,
      validate: {
      },
      defaultValue: {
        text: '',
        image: '',
      }
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      defaultValue: DataTypes.NOW,
    },

    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      defaultValue: DataTypes.NOW,
    },

    next_update: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NULL,
    },

    update_schedule: {
      type: DataTypes.ARRAY(DataTypes.DATE),
    }
  });
