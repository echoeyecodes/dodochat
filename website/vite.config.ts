import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");

    return {
        plugins: [tanstackStart(), react(), tsconfigPaths(), tailwindcss()],
        preview: {
            port: parseInt(env.WEBSITE_PORT!, 10),
            host: true,
            allowedHosts: env.ALLOWED_HOSTS?.split(",") || [],
        },
        define: {
            "import.meta.env.BASE_API_URL": JSON.stringify(env.BASE_API_URL),
            "import.meta.env.CDN_URL": JSON.stringify(env.CDN_URL),
            "import.meta.env.FIREBASE_API_KEY": JSON.stringify(env.FIREBASE_API_KEY),
            "import.meta.env.FIREBASE_AUTH_DOMAIN": JSON.stringify(env.FIREBASE_AUTH_DOMAIN),
            "import.meta.env.FIREBASE_PROJECT_ID": JSON.stringify(env.FIREBASE_PROJECT_ID),
            "import.meta.env.FIREBASE_STORAGE_BUCKET": JSON.stringify(env.FIREBASE_STORAGE_BUCKET),
            "import.meta.env.FIREBASE_MESSAGING_SENDER_ID": JSON.stringify(
                env.FIREBASE_MESSAGING_SENDER_ID,
            ),
            "import.meta.env.FIREBASE_APP_ID": JSON.stringify(env.FIREBASE_APP_ID),
        },
    };
});
