import * as relief from '../models/reliefModel.js';
import * as donationsModel from '../models/donationModel.js';
import pool from '../config/db.js';
export const requests = async (_req,res) => res.json(await relief.all());
export const donations = async (_req,res) => res.json(await donationsModel.allWithUsers());
export const updateRequest = async (req,res) => { const {status,admin_remarks,approved_amount}=req.body; if (!['pending','approved','rejected'].includes(status)) return res.status(400).json({message:'Choose pending, approved, or rejected.'}); const result=await relief.updateStatus(req.params.id,status,admin_remarks,approved_amount); result.affectedRows ? res.json({message:`Request #${req.params.id} updated to ${status}.`}) : res.status(404).json({message:'Request not found.'}); };
export const deleteRequest = async (req,res) => { try { const result = await relief.remove(req.params.id); result.affectedRows ? res.json({message:`Request #${req.params.id} was deleted.`}) : res.status(404).json({message:'Request not found.'}); } catch { res.status(500).json({message:'Unable to delete this request.'}); } };
export const analytics = async (_req,res) => { const [[a]]=await pool.execute(`SELECT (SELECT COALESCE(SUM(amount),0) FROM donations WHERE payment_status='completed') totalFunds,(SELECT COUNT(*) FROM relief_requests WHERE status='pending') pendingRequests,(SELECT COUNT(*) FROM relief_requests WHERE status='approved') approvedRequests,(SELECT COUNT(*) FROM users WHERE role='user') totalUsers`); res.json(a); };

