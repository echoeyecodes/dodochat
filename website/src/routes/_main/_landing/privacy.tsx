import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/_landing/privacy")({
    component: PrivacyPage,
});

function PrivacyPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 pt-32 pb-24 font-sans">
            <h1 className="text-[48px] font-bold tracking-tight text-(--color-text-primary) mb-8 leading-tight">
                Privacy Policy
            </h1>
            <div className="prose prose-slate max-w-none flex flex-col gap-8 text-(--color-text-secondary) leading-relaxed">
                <section className="flex flex-col gap-4">
                    <h2 className="text-[24px] font-bold text-(--color-text-primary)">
                        1. Introduction
                    </h2>
                    <p>
                        Welcome to DodoChat. We value your privacy and are committed to protecting
                        your personal data. This privacy policy will inform you as to how we look
                        after your personal data when you visit our website or use our application.
                    </p>
                </section>

                <section className="flex flex-col gap-4">
                    <h2 className="text-[24px] font-bold text-(--color-text-primary)">
                        2. Data We Collect
                    </h2>
                    <p>
                        We collect and process the files (images, documents, PDFs) you upload to our
                        application. This data is handled with extreme care and is used solely to
                        provide the AI-powered analysis, image processing, and conversation features
                        you request.
                    </p>
                    <ul className="list-disc pl-6 flex flex-col gap-2">
                        <li>Uploaded file content and metadata</li>
                        <li>Processed image results</li>
                        <li>User account information (email, name)</li>
                    </ul>
                </section>

                <section className="flex flex-col gap-4">
                    <h2 className="text-[24px] font-bold text-(--color-text-primary)">
                        3. How We Process Your Data
                    </h2>
                    <p>
                        Your uploaded content is processed to create vector embeddings which allow
                        our AI models to "understand" and retrieve relevant information. We use
                        tools like image processing libraries (e.g., Sharp) to perform the edits you
                        request. We do not use your private data to train global AI models.
                    </p>
                </section>

                <section className="flex flex-col gap-4">
                    <h2 className="text-[24px] font-bold text-(--color-text-primary)">
                        4. Data Security
                    </h2>
                    <p>
                        We implement appropriate technical and organizational measures to ensure a
                        level of security appropriate to the risk of processing your personal data.
                    </p>
                </section>

                <p className="text-[14px] text-(--color-text-tertiary) italic mt-8">
                    Last Updated: March 10, 2026
                </p>
            </div>
        </div>
    );
}
