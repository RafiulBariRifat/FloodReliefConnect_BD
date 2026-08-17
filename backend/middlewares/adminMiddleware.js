export const requireAdmin = (req, res, next) => req.user?.role === 'admin'
  ? next() : res.status(403).json({ message: 'Administrator access required.' });
