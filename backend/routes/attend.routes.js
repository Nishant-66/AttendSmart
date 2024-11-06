import express from 'express';
import { trackAttendance, calculateAttendanceStatus } from '../controllers/attend.controller.js';
import authMiddleware from '../middlewares/protectRoutes.js'; 

const router = express.Router();
router.post('/:classId', authMiddleware, trackAttendance);
router.get('/:classId/status', authMiddleware, calculateAttendanceStatus);

export default router;
