const jwt = require("jsonwebtoken");

const JWT_SECRET = "yourSecretKey";  
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ message: "Authentication token required." });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }

    req.user = user; 
    next(); 
  });
};

module.exports = authenticateToken;
