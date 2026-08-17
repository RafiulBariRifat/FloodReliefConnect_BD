import pool from '../config/db.js';
export const findByEmail = async (email) => (await pool.execute('SELECT * FROM users WHERE email = ?', [email]))[0][0];
export const findPublicById = async (id) => (await pool.execute('SELECT user_id, full_name, email, phone_number, nid_number, profile_image, role, created_at FROM users WHERE user_id = ?', [id]))[0][0];
export const create = async (data) => (await pool.execute('INSERT INTO users (full_name,email,phone_number,password_hash,nid_number,role) VALUES (?,?,?,?,?,?)', [data.full_name,data.email,data.phone_number,data.password_hash,data.nid_number || null,data.role || 'user']))[0];
export const updateProfile = async (id, data) => (await pool.execute('UPDATE users SET full_name=?, phone_number=?, profile_image=? WHERE user_id=?', [data.full_name, data.phone_number, data.profile_image || null, id]))[0];
export const updatePassword = async (id, passwordHash) => pool.execute('UPDATE users SET password_hash = ? WHERE user_id = ?', [passwordHash, id]);
