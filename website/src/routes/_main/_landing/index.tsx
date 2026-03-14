import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_main/_landing/')({
    component: LandingPage,
    loader: async ({ context }) => {
        return context.user
    }
})

function LandingPage() {
    const user = Route.useLoaderData()
    const isLoggedIn = !!user

    return (
        <article className="max-w-[700px] mx-auto px-6 py-24 md:py-32 flex flex-col gap-12">
            <header className="flex flex-col gap-4">
                <time className="text-[12px] font-medium text-(--color-text-tertiary) uppercase tracking-widest">
                    March 2026
                </time>
                <h1 className="text-[40px] md:text-[56px] font-bold tracking-tight text-(--color-text-primary) leading-[1.1]">
                    Building DodoChat
                </h1>
            </header>

            <div className="prose prose-neutral max-w-none prose-p:text-[17px] prose-p:leading-[1.7] prose-p:text-(--color-text-secondary) prose-headings:text-(--color-text-primary) prose-headings:font-bold prose-strong:text-(--color-text-primary)">
                <p>
                    I started building DodoChat to understand what it's like to work with LLMs beyond basic prompt-and-response. I wanted a space to explore how streaming, tool calls, and document context actually feel in a real application.
                </p>

                <p>
                    Most of my time has been spent on the details that make AI feel less like a black box and more like a tool. This means fast, token-by-token streaming, the ability for the model to interact with files, and maintaining a clear conversation history.
                </p>

                <h2 className="text-[24px] mt-12 mb-4">Core Focus</h2>

                <p>
                    The project is primarily an exploration of three things:
                </p>

                <div className="my-12 flex flex-col gap-4">
                    <div className="rounded-xl overflow-hidden border border-(--color-border-subtle) bg-(--color-bg-subtle)">
                        <img
                            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200"
                            alt="Code exploration"
                            className="w-full aspect-video object-cover"
                        />
                    </div>
                    <span className="text-[13px] text-(--color-text-tertiary) italic text-center">Exploring complex tool-calling patterns within the chat runtime.</span>
                </div>

                <h2 className="text-[24px] mt-12 mb-4">What DodoChat Supports</h2>

                <p>
                    The current version of the experiment is built to handle more than just text. It integrates directly with external data and the local file system using a suite of custom tools:
                </p>

                <ul className="list-none pl-0 flex flex-col gap-6 mt-8">
                    <li className="flex flex-col gap-1">
                        <strong className="text-[16px]">Document Intelligence & RAG</strong>
                        <span className="text-(--color-text-secondary)">
                            It uses vector embeddings to index uploaded documents. When you ask a question, it searches for the most relevant chunks of text to provide accurate context to the model.
                        </span>
                    </li>
                    <li className="flex flex-col gap-1">
                        <strong className="text-[16px]">File Generation</strong>
                        <span className="text-(--color-text-secondary)">
                            You can ask the AI to summarize a conversation or transform data into portable formats. It currently supports generating both <code>.txt</code> and <code>.pdf</code> files on the fly.
                        </span>
                    </li>
                    <li className="flex flex-col gap-1">
                        <strong className="text-[16px]">Image & Media Reasoning</strong>
                        <span className="text-(--color-text-secondary)">
                            The system handles multi-modal inputs natively. It can "see" uploaded images or process external media (like gaming covers from IGDB) and apply effects using <a href="https://sharp.pixelplumbing.com/" target="_blank" rel="noreferrer" className="text-(--color-text-primary) underline underline-offset-4 decoration-(--color-border) hover:decoration-(--color-text-primary) transition-colors">sharp</a> via tool calls.
                        </span>
                    </li>
                    <li className="flex flex-col gap-1">
                        <strong className="text-[16px]">Gaming Data & IGDB</strong>
                        <span className="text-(--color-text-secondary)">
                            Integrated with the IGDB database, the AI can search for game details, fetch high-resolution screenshots, and reason about release dates or platform availability.
                        </span>
                    </li>
                </ul>

                <div className="my-12 flex flex-col gap-4">
                    <div className="rounded-xl overflow-hidden border border-(--color-border-subtle) bg-(--color-bg-subtle)">
                        <img
                            src="https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=1200"
                            alt="Multi-modal interface"
                            className="w-full aspect-video object-cover"
                        />
                    </div>
                    <span className="text-[13px] text-(--color-text-tertiary) italic text-center">Testing multi-modal reasoning and external data integrations.</span>
                </div>

                <h2 className="text-[24px] mt-12 mb-4">The Technical Stack</h2>

                <p>
                    DodoChat is built with a focus on low latency and developer ergonomics. The architecture is designed to be lean, using modern tools that allow for rapid experimentation:
                </p>

                <ul className="list-disc pl-5 flex flex-col gap-2 mt-4 text-(--color-text-secondary)">
                    <li><strong>Runtime:</strong> Built on Bun and Node.js for high-performance server-side execution.</li>
                    <li><strong>Intelligence:</strong> Powered by Google's Gemini models (including Flash for fast inference and Text-Embedding-001 for RAG).</li>
                    <li><strong>Orchestration:</strong> Uses the <a href="https://ai-sdk.dev/" target="_blank" rel="noreferrer" className="text-(--color-text-primary) underline underline-offset-4 decoration-(--color-border) hover:decoration-(--color-text-primary) transition-colors font-medium">Vercel AI SDK</a> to manage tool calling, streaming, and complex multi-step reasoning.</li>
                    <li><strong>Frontend:</strong> A React-based single-page application built with Vite and TanStack Router for type-safe, fluid navigation.</li>
                </ul>

                <h2 className="text-[24px] mt-12 mb-4">Open Source</h2>

                <p>
                    DodoChat is open source. You can find the full implementation, from the tool-calling logic to the streaming architecture, on <a href="https://github.com/echoeyecodes/dodochat" target="_blank" rel="noreferrer" className="text-(--color-text-primary) underline underline-offset-4 decoration-(--color-border) hover:decoration-(--color-text-primary) transition-colors font-medium">GitHub</a>.
                </p>

                <p className="mt-12">
                    DodoChat is an ongoing experiment in AI interaction. It's a space where I explore new patterns for digital assistance, aiming to build tools that feel as responsive and capable as they are intelligent.
                </p>
            </div>

            <section className="mt-16 pt-12 border-t border-(--color-border-subtle) flex flex-col items-start gap-8">
                <div className="flex flex-col gap-2">
                    <h3 className="text-[18px] font-bold text-(--color-text-primary)">Want to try it out?</h3>
                    <p className="text-(--color-text-secondary)">You can use the current version of the app to chat with Gemini and test the file processing features.</p>
                </div>

                <Button size="lg" asChild className="h-14 px-10 text-[15px] font-bold shadow-sm">
                    <Link to={isLoggedIn ? '/conversations' : '/login'}>
                        {isLoggedIn ? 'Go to Conversations' : 'Get Started'}
                    </Link>
                </Button>
            </section>
        </article>
    )
}
