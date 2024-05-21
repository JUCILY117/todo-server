const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, '18313d01a0a7def16645a409dd7f24376ddeea0758f943c0d9bf36ed30a25fe42d1cd8f4bb88b2ba654498ef64b0c5af4c9c2f93279f4acdb547ec8011ff09f4 '); // Replace 'your_jwt_secret' with your actual secret
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
