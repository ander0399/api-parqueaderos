const verifyToken = require("../middlewares/verifyToken");


//verificar token
const isAuthenticated = async (req, res, next) => {
  try {
      const token = req.headers.authorization.split(" ")[1];
      const tokenData = await verifyToken(token);
      if (tokenData.id) {
          req.userId = tokenData.id;
          next();
      } else {
          res.status(400);
          res.json({ error: '¡Tu por aqui no pasas!' });
      }
  } catch (e) {
      res.status(400);
      res.json({ error: '¡Tu por aqui no pasas!' });
  }
}

// validar si es socio
const isSocio = async (req, res, next) => {
  try {
      const token = req.headers.authorization.split(" ")[1];
      const tokenData = await verifyToken(token);
      if (tokenData.id) {
          next();
      } else {
          res.status(400);
          res.json({ message: '¡Tu por aqui no pasas, solo socios!' });
      }
  } catch (e) {
      res.status(400);
      res.json({ error: '¡Tu por aqui no pasas, solo socios!' });
  }
}

// validar si es admin
const isAdmin = async (req, res, next) => {
  try {
      const token = req.headers.authorization.split(" ")[1];
      const tokenData = await verifyToken(token);
      if (tokenData.id && tokenData.admin === true) {
          next();
      } else {
          res.status(400);
          res.json({ message: '¡Tu por aqui no pasas, solo admins!' });
      }
  } catch (e) {
      res.status(400);
      res.json({ error: '¡Tu por aqui no pasas, solo admins!' });
  }
}

module.exports = {
  isAuthenticated,
  isSocio,
  isAdmin
};