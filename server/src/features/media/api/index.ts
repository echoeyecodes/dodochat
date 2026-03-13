import express from 'express';
import multer from 'multer';
import { mediaActions } from './actions';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ 
    storage,
    fileFilter: (_req, file, cb) => {
        const allowedTypes = ['text/plain', 'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf'];
        if (allowedTypes.includes(file.mimetype) || file.originalname.endsWith('.txt')) {
            cb(null, true);
        } else {
            cb(new Error('Only text and image files are supported'));
        }
    }
});

router.post('/upload', upload.single('file'), mediaActions.uploadFile);
router.get('/:conversationId', mediaActions.getFiles);

export default router;
