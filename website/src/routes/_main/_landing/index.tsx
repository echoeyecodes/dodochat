import React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { LucideArrowRight, LucideUpload, LucideMessageSquare, LucideSearch, LucideShieldCheck } from 'lucide-react'

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
        <>
            {/* ─── Hero Section ─── */}
            <section className="relative min-h-[calc(100vh-72px)] flex items-center px-6 overflow-hidden border-b border-(--color-border)">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-(--color-accent-subtle) blur-[140px] rounded-full translate-x-1/2 -translate-y-1/2 -z-10 opacity-60"></div>

                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center py-16">
                    <div className="flex flex-col gap-10">
                        <div className="inline-flex items-center gap-2 w-fit px-4 py-1.5 rounded-full bg-white border border-(--color-border-subtle) shadow-sm text-(--color-accent) text-[12px] font-bold uppercase tracking-wider">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-(--color-accent) opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-(--color-accent)"></span>
                            </span>
                            Now Powered by Gemini 1.5
                        </div>
                        <div className="flex flex-col gap-6">
                            <h1 className="text-[52px] md:text-[84px] font-bold leading-[0.95] tracking-tight text-(--color-text-primary)">
                                Intelligent AI <br /> built for <br />
                                <span className="text-(--color-accent) relative">
                                    efficiency.
                                    <svg className="absolute -bottom-2 left-0 w-full" width="240" height="20" viewBox="0 0 240 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.5 17.5C40 7.5 120 7.5 237.5 17.5" stroke="var(--color-accent)" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
                                    </svg>
                                </span>
                            </h1>
                            <p className="text-[18px] md:text-[22px] text-(--color-text-secondary) max-w-[540px] leading-relaxed font-medium">
                                Chat, process images, and analyze documents in one place. DodoChat is your versatile companion for handling complex tasks with simple conversations.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-5 pt-4">
                            <Button size="lg" asChild roundness="full" className="px-10 h-16 text-[16px] shadow-xl shadow-orange-500/20">
                                <Link to={isLoggedIn ? '/conversations' : '/login'}>
                                    {isLoggedIn ? 'Open App' : 'Get Started for Free'}
                                    <LucideArrowRight />
                                </Link>
                            </Button>
                        </div>
                        <div className="flex items-center gap-4 text-[13px] text-(--color-text-tertiary) font-medium">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-4 border-(--color-bg) bg-(--color-bg-muted) flex items-center justify-center overflow-hidden">
                                        <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                            Trusted by <span className="text-(--color-text-primary) font-bold">2,000+</span> power users
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="absolute inset-0 bg-(--color-accent) blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity duration-1000"></div>
                        <div className="relative rounded-[40px] overflow-hidden shadow-(--shadow-editorial) border-8 border-white/50 backdrop-blur-sm transition-all duration-700 aspect-square">
                            <img
                                src="/hero-visual.png"
                                alt="Groupchat AI Visual"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── How it Works ─── */}
            <section id="how-it-works" className="py-24 px-6 md:py-40 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-24">
                        <div className="flex flex-col gap-6 max-w-xl">
                            <h2 className="text-[14px] font-bold text-(--color-accent) uppercase tracking-[0.2em] px-4 py-1 bg-orange-50 rounded-full w-fit">The Process</h2>
                            <h3 className="text-[40px] md:text-[56px] font-bold tracking-tight text-(--color-text-primary) leading-tight">Three steps to <br /> total clarity.</h3>
                        </div>
                        <p className="text-(--color-text-secondary) text-[18px] max-w-[400px] leading-relaxed mb-4">Stop scrolling through thousands of messages manually. Let AI do the heavy lifting for you.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line */}
                        <div className="absolute top-1/2 left-0 w-full h-px bg-linear-to-r from-transparent via-(--color-border) to-transparent hidden lg:block -translate-y-12"></div>

                        {[
                            {
                                icon: <LucideUpload className="w-7 h-7" />,
                                title: 'Upload to DodoChat',
                                desc: 'Drag your file into DodoChat. We process and index your conversations securely.'
                            },
                            {
                                icon: <LucideMessageSquare className="w-7 h-7" />,
                                title: 'Chat & Edit',
                                desc: 'Ask questions about your documents or request image edits like rotation and filters using natural language.'
                            },
                            {
                                icon: <LucideShieldCheck className="w-7 h-7" />,
                                title: 'Secure History',
                                desc: 'Your conversations and files are stored securely, creating a personal knowledge base for you alone.'
                            },
                        ].map((step, i) => (
                            <div key={i} className="relative flex flex-col gap-8 p-10 rounded-[32px] bg-(--color-bg) border border-(--color-border-subtle) hover:border-(--color-accent)/30 transition-all duration-500 hover:shadow-(--shadow-editorial) group h-full">
                                <div className="flex items-center justify-between">
                                    <div className="w-14 h-14 bg-white shadow-md rounded-2xl flex items-center justify-center text-(--color-accent) group-hover:bg-(--color-accent) group-hover:text-white transition-all duration-500">
                                        {step.icon}
                                    </div>
                                    <span className="text-[48px] font-black text-(--color-text-primary) opacity-5 italic select-none">0{i + 1}</span>
                                </div>
                                <div className="flex flex-col gap-4 mt-4">
                                    <h4 className="text-[22px] font-bold text-(--color-text-primary) tracking-tight">{step.title}</h4>
                                    <p className="text-(--color-text-secondary) leading-relaxed text-[16px]">{step.desc}</p>
                                </div>
                                <div className="mt-4 flex items-center gap-2 text-[13px] font-bold text-(--color-accent) opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                                    Learn more <LucideArrowRight className="w-3.5 h-3.5" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Features ─── */}
            <section id="features" className="py-24 px-6 md:py-40 bg-(--color-bg-subtle) overflow-hidden relative">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-center">
                    <div className="relative">
                        <div className="bg-white p-10 rounded-[40px] shadow-(--shadow-editorial) border border-(--color-border) flex flex-col gap-8 -rotate-2 relative z-10 transition-transform duration-700 hover:rotate-0">
                            <div className="flex items-center gap-3 border-b border-(--color-border) pb-6">
                                <div className="w-3.5 h-3.5 rounded-full bg-red-400/80"></div>
                                <div className="w-3.5 h-3.5 rounded-full bg-yellow-400/80"></div>
                                <div className="w-3.5 h-3.5 rounded-full bg-green-400/80"></div>
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className="p-4 rounded-[20px] bg-(--color-bg-subtle) text-[14px] font-medium self-start max-w-[85%] border border-(--color-border-subtle)">Can you rotate this photo and give it a vintage tint?</div>
                                <div className="p-4 rounded-[20px] bg-(--color-accent) text-white text-[14px] font-medium self-end max-w-[85%] shadow-xl shadow-orange-500/30">
                                    Done! I've rotated your photo 90° and applied a red tint for that warm vintage feel. You can download the result below.
                                </div>
                            </div>
                        </div>
                        {/* Decorative blobs */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-500/10 blur-[60px] rounded-full"></div>
                        <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-3xl shadow-2xl border border-(--color-border) hidden lg:block animate-bounce [animation-duration:4s] z-20">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-(--color-accent)">
                                    <LucideSearch className="w-6 h-6" />
                                </div>
                                <span className="text-[16px] font-bold tracking-tight">Semantic Discovery</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-12">
                        <div className="flex flex-col gap-6">
                            <h2 className="text-[40px] md:text-[56px] font-bold tracking-tight text-(--color-text-primary) leading-[1.1]">All your work <br /> in one place.</h2>
                            <p className="text-(--color-text-secondary) text-[18px] leading-relaxed">From quick image edits to deep document analysis, DodoChat adapts to your needs. It's a general-purpose assistant that learns from the context you provide.</p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-8">
                            {[
                                { title: 'Privacy First', icon: <LucideShieldCheck />, desc: 'Local processing, zero global training.' },
                                { title: 'Fast Indexing', icon: <LucideUpload />, desc: '50k+ messages indexed in seconds.' },
                                { title: 'Multi-Chat', icon: <LucideMessageSquare />, desc: 'Switch between group context instantly.' },
                                { title: 'Smart Cleanup', icon: <LucideArrowRight />, desc: 'Automatic de-duplication and cleaning.' },
                            ].map((f, i) => (
                                <div key={i} className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2 text-(--color-accent) font-bold text-[15px]">
                                        {React.cloneElement(f.icon as React.ReactElement<any>, { className: 'w-4 h-4' })}
                                        {f.title}
                                    </div>
                                    <p className="text-[14px] text-(--color-text-tertiary) leading-relaxed">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── CTA Section ─── */}
            <section className="py-24 px-6 md:py-48">
                <div className="max-w-5xl mx-auto rounded-[60px] bg-(--color-text-primary) p-12 md:p-32 text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-(--color-accent) blur-[150px] opacity-20 z-0"></div>
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500 blur-[150px] opacity-10 z-0"></div>
                    <div className="relative z-10 flex flex-col gap-10 items-center">
                        <h2 className="text-[42px] md:text-[64px] font-bold tracking-tight text-white leading-[1.05]">Experience the <br /> future of chat.</h2>
                        <p className="text-white/50 text-[18px] md:text-[22px] max-w-xl mx-auto leading-relaxed">Join users who are supercharging their productivity with an AI that doesn't just talk, but acts.</p>
                        <Button size="lg" roundness="full" asChild className="px-12 h-18 text-[18px] bg-white text-black hover:bg-white/90">
                            <Link to={isLoggedIn ? '/conversations' : '/login'}>
                                {isLoggedIn ? 'Open App' : 'Get Started Now'}
                                <LucideArrowRight className="w-5 h-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </>
    )
}
