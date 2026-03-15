import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "@/features/common/middlewares/error";
import conversationRoutes from "@/features/conversation/api";
import mediaRoutes from "@/features/media/api";
import authRoutes from "@/features/auth/api";
import userRoutes from "@/features/user/api";
import attachUserToRequest from "@/features/common/middlewares/attachUserToRequest";
import attachIPAddress from "@/features/common/middlewares/attachIPAddress";

const app = express();

app.use(
    cors({
        origin: true,
        credentials: true,
    }),
);
app.use(express.json());
app.use(cookieParser());
app.use(attachIPAddress);
app.use(attachUserToRequest);
app.use("/uploads", express.static("uploads"));

app.use("/api/conversations", conversationRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use((req, res, next) => {
    res.status(404);
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.name = "RESOURCE_NOT_FOUND";
    next(error);
});

app.use(errorHandler);

export default app;
