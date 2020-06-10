const jwt = require('jsonwebtoken');

const config = require('config');
const JWT_SECRET = config.get('jwtSecret');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const decodedToken = jwt.verify(token, JWT_SECRET);

    req.user = decodedToken;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Error - Not authorized' });
  }
};
