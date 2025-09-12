export default function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fullName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'full_name'
    },
    userPassword: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'user_password'
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true 
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_at'
    },
    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'refresh_token'
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: true,  // Enabling createdAt and updatedAt
    updatedAt: false,  // Disabling automatic update of updatedAt
    underscored: true,  // Converts camelCase field names to snake_case
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
}
