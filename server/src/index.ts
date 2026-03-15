import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "@/lib/db";

const PORT = process.env.SERVER_PORT || 3001;

await connectDB();

app.listen(PORT, () => {
    console.log(`Backend server listening at ${PORT}`);
});
