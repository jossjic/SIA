const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "http://database-sia.cn6ciymc8chd.us-east-2.rds.amazonaws.com/",
  user: "admin",
  password: "AdminSIA10042024JJLACV",
  database: "SIA_albergue",
});

connection.connect((err) => {
  if (err) {
    console.error("Error de conexión:", err);
    return;
  }
  console.log("Conectado a la base de datos MySQL");
});

module.exports = connection;
