import express from "express";
import multer from "multer";
import isAuthenticated from "../../common/middlewares/isAuthenticated";
import { mediaActions } from "./actions";
const router = express.Router();
const storage = multer.memoryStorage();

const upload = multer({
    storage,
    fileFilter: (_req, file, cb) => {
        const allowedTypes = [
            "text/plain",
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
            "application/pdf",
            "audio/mpeg",
            "audio/wav",
            "audio/ogg",
            "audio/m4a",
            "audio/aac",
        ];
        if (allowedTypes.includes(file.mimetype) || file.originalname.endsWith(".txt")) {
            cb(null, true);
        } else {
            cb(new Error("Only text and image files are supported"));
        }
    },
});

router.post("/upload", isAuthenticated, upload.single("file"), mediaActions.uploadFile);
router.get("/conversation/:conversationId", isAuthenticated, mediaActions.getFiles);

export default router;
