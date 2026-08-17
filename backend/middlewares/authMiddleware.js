import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Authentication token required.' });
  try { req.user = jwt.verify(token, process.env.JWT_SECRET || 'development_only_change_me'); next(); }
  catch { res.status(401).json({ message: 'Invalid or expired session.' }); }
};
