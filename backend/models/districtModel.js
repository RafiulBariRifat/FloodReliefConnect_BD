import pool from '../config/db.js';
export const allActive = async () => (await pool.execute('SELECT district_id, district_name FROM districts WHERE is_active=1 ORDER BY district_name'))[0];
