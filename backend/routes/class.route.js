import express from 'express';
import { classCreation, getClass, updateClass, deleteClass } from '../controllers/class.controller.js';
import authMiddleware from '../middlewares/protectRoutes.js'; 

const router = express.Router();
router.post('/', authMiddleware, classCreation);
router.get('/:classId', authMiddleware, getClass);
router.put('/:classId', authMiddleware, updateClass);
router.delete('/:classId', authMiddleware, deleteClass);

export default router;
