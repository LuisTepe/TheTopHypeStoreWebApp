var DataTypes = require("sequelize").DataTypes;
var _detalle_ventas = require("./detalle_ventas");
var _productos = require("./productos");
var _roles = require("./roles");
var _usuarios = require("./usuarios");
var _ventas = require("./ventas");

function initModels(sequelize) {
  var detalle_ventas = _detalle_ventas(sequelize, DataTypes);
  var productos = _productos(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);
  var ventas = _ventas(sequelize, DataTypes);

  // Definir relaciones con nombres de alias claros
  detalle_ventas.belongsTo(productos, { as: "producto", foreignKey: "id_producto" });
  productos.hasMany(detalle_ventas, { as: "detalle_ventas", foreignKey: "id_producto" });

  usuarios.belongsTo(roles, { as: "role", foreignKey: "roletype_id" });
  roles.hasMany(usuarios, { as: "usuarios", foreignKey: "roletype_id" });

  ventas.belongsTo(usuarios, { as: "usuario", foreignKey: "id_usuario" });
  usuarios.hasMany(ventas, { as: "ventas", foreignKey: "id_usuario" });

  detalle_ventas.belongsTo(ventas, { as: "venta", foreignKey: "id_venta" });
  ventas.hasMany(detalle_ventas, { as: "detalle_ventas", foreignKey: "id_venta" });

  return {
    detalle_ventas,
    productos,
    roles,
    usuarios,
    ventas,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
