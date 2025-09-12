export default function(sequelize, DataTypes) {
  return sequelize.define('tasks', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    task_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    task_status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT, 
      allowNull: true       
    },
    dueDate: {
      type: DataTypes.DATE, 
      allowNull: true       
    },
    // Foreign key for user relationship
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', 
        key: 'id'      
      },
      onDelete: 'CASCADE' 
    }
  }, {
    sequelize,
    tableName: 'tasks',
    timestamps: false, 
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
       // Composite unique constraint: task_name + task_status
      {
        name: "task_name_status_unique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "task_name" },
          { name: "task_status" }
        ]
      }
    ]
  });
}
