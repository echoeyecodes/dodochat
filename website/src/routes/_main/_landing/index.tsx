import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { LucidePlus, LucideMic, LucideChevronDown, LucidePenLine, LucideFileSearch, LucideCode2, LucideInfo, LucideSparkles } from 'lucide-react'

export const Route = createFileRoute('/_main/_landing/')({
    component: LandingPage,
    loader: async ({ context }) => {
        return context.user
    }
})

import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

function LandingPage() {
    const user = Route.useLoaderData()
    const isLoggedIn = !!user
    const navigate = useNavigate()
    const [inputValue, setInputValue] = useState('')

    const handleStart = (e?: React.FormEvent) => {
        e?.preventDefault()
        const target = isLoggedIn ? '/conversations' : '/login'
        const search = inputValue ? { q: inputValue } : {}
        navigate({ to: target, search })
    }

    return (
        <div className="flex flex-col min-h-screen bg-(--color-bg)">
            <section className="relative pt-24 pb-32 md:pt-40 md:pb-48 flex flex-col items-center px-6">
                <div className="w-full max-w-4xl flex flex-col items-center">

                    <div className="animate-in fade-in duration-700">
                        <span className="px-3 py-1 rounded-full bg-(--color-bg-muted) text-(--color-text-secondary) text-[11px] font-bold">
                            Beta
                        </span>
                    </div>

                    <div className="flex items-center gap-4 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-(--color-accent) rounded-xl flex items-center justify-center text-white shadow-sm">
                            <LucideSparkles className="w-6 h-6 md:w-7 md:h-7" />
                        </div>
                        <h1 className="text-[32px] md:text-[48px] font-bold tracking-tight text-(--color-text-primary)">
                            DodoChat
                        </h1>
                    </div>

                    <form
                        onSubmit={handleStart}
                        className="w-full max-w-3xl mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100"
                    >
                        <div className="bg-(--color-bg-elevated) border border-(--color-border) rounded-[24px] p-6 shadow-sm transition-all hover:border-(--color-border-subtle) min-h-[140px] flex flex-col justify-between focus-within:border-(--color-text-tertiary)/30">
                            <textarea
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        handleStart()
                                    }
                                }}
                                placeholder="How can I help you today?"
                                className="w-full bg-transparent border-none outline-none resize-none text-[17px] md:text-[19px] text-(--color-text-primary) placeholder:text-(--color-text-tertiary) font-medium px-2 py-1 min-h-[80px]"
                                autoFocus
                            />

                            <div className="flex items-center justify-between mt-4">
                                <div className="p-2 rounded-lg hover:bg-(--color-bg-subtle) text-(--color-text-tertiary) cursor-not-allowed transition-colors">
                                    <LucidePlus className="w-5 h-5" />
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-(--color-border) bg-(--color-bg-subtle) text-(--color-text-secondary) text-[12px] font-bold cursor-not-allowed">
                                        Gemini 2.0 Flash <LucideChevronDown className="w-3.5 h-3.5" />
                                    </div>
                                    <button
                                        type="submit"
                                        className="p-2.5 rounded-lg bg-(--color-accent) text-white hover:bg-(--color-accent-hover) transition-all shadow-sm active:scale-95"
                                    >
                                        <LucideMic className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className="flex flex-wrap justify-center gap-2 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        {[
                            { label: 'Write', icon: LucidePenLine },
                            { label: 'Analyze', icon: LucideFileSearch },
                            { label: 'Code', icon: LucideCode2 },
                            { label: 'Gaming', icon: LucideSparkles },
                            { label: 'Explore', icon: LucideInfo },
                        ].map((cat, i) => (
                            <button key={i} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-(--color-border) bg-(--color-bg-subtle) text-(--color-text-secondary) text-[13px] font-bold hover:text-(--color-text-primary) hover:border-(--color-text-tertiary)/30 transition-all">
                                <cat.icon className="w-3.5 h-3.5 opacity-60" />
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
                        <Button size="lg" asChild className="h-14 px-10 text-[15px] font-bold rounded-2xl bg-(--color-accent) hover:bg-(--color-accent-hover) text-white border-none shadow-sm transition-transform hover:scale-[1.01] active:scale-[0.99]">
                            <Link to={isLoggedIn ? '/conversations' : '/login'}>
                                {isLoggedIn ? 'Jump into Workbench' : 'Enter Playground'}
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            <article className="max-w-3xl mx-auto px-6 flex flex-col gap-14 scroll-mt-20">
                <header className="flex flex-col gap-5">
                    <h2 className="text-[36px] md:text-[48px] font-bold tracking-tight text-(--color-text-primary) leading-[1.1]">
                        Welcome to <span className="text-(--color-accent)">DodoChat</span>.
                    </h2>
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
                                src="/screenshot_8sadh1.jpeg"
                                alt="Chat flow and tool calling"
                                className="w-full object-cover"
                            />
                        </div>
                        <span className="text-[13px] text-(--color-text-tertiary) italic text-center">A glimpse into the streaming interaction and tool execution.</span>
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

                    <div className="flex flex-col">
                        <div className="rounded-xl overflow-hidden border border-(--color-border-subtle) bg-(--color-bg-subtle)">
                            <img
                                src="/screenshot_gewea.jpeg"
                                alt="Technical implementation details"
                                className="w-full object-cover"
                            />
                        </div>
                        <div className="rounded-xl overflow-hidden border border-(--color-border-subtle) bg-(--color-bg-subtle)">
                            <img
                                src="/screenshot_21772.jpeg"
                                alt="File processing and RAG"
                                className="w-full object-cover"
                            />
                        </div>
                        <span className="text-[13px] text-(--color-text-tertiary) italic text-center">Handling localized file context and multi-modal reasoning.</span>
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

                    <div className="my-12">
                        <div className="rounded-xl overflow-hidden border border-(--color-border-subtle) bg-(--color-bg-subtle)">
                            <img
                                src="/screenshot_sadu.jpeg"
                                alt="DodoChat UI in action"
                                className="w-full object-cover"
                            />
                        </div>
                    </div>

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
        </div>
    )
}
