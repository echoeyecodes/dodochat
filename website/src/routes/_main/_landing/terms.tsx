import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/_landing/terms")({
    component: TermsPage,
});

function TermsPage() {
    return (
        <div className="w-full px-6 pt-32 pb-24 font-sans">
            <h1 className="text-[48px] font-bold tracking-tight text-(--color-text-primary) mb-8 leading-tight">
                Terms of Service
            </h1>
            <div className="prose prose-slate max-w-none flex flex-col gap-8 text-(--color-text-secondary) leading-relaxed">
                <section className="flex flex-col gap-4">
                    <h2 className="text-[24px] font-bold text-(--color-text-primary)">
                        1. Acceptance of Terms
                    </h2>
                    <p>
                        By accessing and using DodoChat, you agree to be bound by these terms. If
                        you do not agree to all of these terms, you should not use the service.
                    </p>
                </section>

                <section className="flex flex-col gap-4">
                    <h2 className="text-[24px] font-bold text-(--color-text-primary)">
                        2. Description of Service
                    </h2>
                    <p>
                        DodoChat is an AI-powered tool that allows users to upload files, process
                        images, and interact with documents using natural language queries.
                    </p>
                </section>

                <section className="flex flex-col gap-4">
                    <h2 className="text-[24px] font-bold text-(--color-text-primary)">
                        3. User Responsibilities
                    </h2>
                    <p>
                        You are responsible for ensuring you have the legal right to upload and
                        process the data you provide to DodoChat. You must not use the service for
                        any illegal or unauthorized purpose.
                    </p>
                </section>

                <section className="flex flex-col gap-4">
                    <h2 className="text-[24px] font-bold text-(--color-text-primary)">
                        4. Limitation of Liability
                    </h2>
                    <p>
                        DodoChat provides the service "as is" and shall not be liable for any
                        direct, indirect, incidental, or consequential damages resulting from the
                        use or inability to use the service.
                    </p>
                </section>

                <p className="text-[14px] text-(--color-text-tertiary) italic mt-8">
                    Last Updated: March 10, 2026
                </p>
            </div>
        </div>
    );
}
