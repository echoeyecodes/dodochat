import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/features/user/models/User";

dotenv.config();

const seed = async () => {
    await connectDB();

    const email = "femiobajuluwa@gmail.com";
    const existing = await UserModel.findOne({ email });

    if (existing) {
        console.log(`User ${email} already exists, skipping.`);
        process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("password", 10);

    const user = await UserModel.create({
        email,
        password: hashedPassword,
        display_name: "Femi",
    });

    console.log(`Seeded user: ${user.email} (id: ${user._id})`);
    process.exit(0);
};

seed().catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
});
