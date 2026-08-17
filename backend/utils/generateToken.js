import jwt from 'jsonwebtoken';
export const generateToken = (user) => jwt.sign(
  { user_id: user.user_id, role: user.role, email: user.email },
  process.env.JWT_SECRET || 'development_only_change_me',
  { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
);
