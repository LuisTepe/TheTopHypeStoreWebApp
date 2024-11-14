// detalle_ventas.js
module.exports = function(sequelize, DataTypes) {
  const DetalleVentas = sequelize.define('detalle_ventas', {
    id_detalle_venta: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_venta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ventas',
        key: 'id_venta'
      }
    },
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'productos',
        key: 'id_producto'
      }
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    subtotal: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    }
  }, {
    tableName: 'detalle_ventas',
    timestamps: false,
  });

  DetalleVentas.associate = function(models) {
    DetalleVentas.belongsTo(models.ventas, { foreignKey: 'id_venta', as: 'venta' });
    DetalleVentas.belongsTo(models.productos, { foreignKey: 'id_producto', as: 'producto' });
  };

  return DetalleVentas;
};
