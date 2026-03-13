import { type UIMessagePart } from 'ai';
import { type ChatTools } from '../../context/ChatContext';

type ToolGetSystemInfoPart = Extract<UIMessagePart<Record<string, unknown>, ChatTools>, { type: 'tool-getSystemInfo' }>;

type ToolGetSystemInfoProps = {
    part: ToolGetSystemInfoPart;
};

export const ToolGetSystemInfo: React.FC<ToolGetSystemInfoProps> = ({ part: p }) => {
    return (
        <div className="bg-(--color-bg-muted) border border-(--color-border) rounded-lg p-3 my-2 text-[12px] font-mono w-full min-w-[240px]">
            <div className="flex items-center gap-2 mb-2 text-(--color-text-secondary) font-bold">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-(--color-accent)">
                    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
                    <path d="M9 9h6v6H9z" />
                    <path d="M15 2v2" />
                    <path d="M15 20v2" />
                    <path d="M2 15h2" />
                    <path d="M2 9h2" />
                    <path d="M20 15h2" />
                    <path d="M20 9h2" />
                    <path d="M9 2v2" />
                    <path d="M9 20v2" />
                </svg>
                System Info
            </div>
            {p.state === 'input-streaming' || p.state === 'input-available' ? (
                <div className="flex gap-2 items-center text-(--color-text-tertiary)">
                    <div className="w-2 h-2 rounded-full bg-(--color-accent) animate-ping" />
                    Fetching process stats...
                </div>
            ) : p.state === 'output-available' ? (
                <div className="grid grid-cols-[80px_1fr] gap-x-2 gap-y-1">
                    <div className="text-(--color-text-tertiary)">Version:</div>
                    <div className="text-(--color-text-primary)">{p.output.node_version}</div>
                    <div className="text-(--color-text-tertiary)">OS:</div>
                    <div className="text-(--color-text-primary)">{p.output.platform} ({p.output.arch})</div>
                    <div className="text-(--color-text-tertiary)">Uptime:</div>
                    <div className="text-(--color-text-primary)">{p.output.uptime}s</div>
                    <div className="text-(--color-text-tertiary)">RSS:</div>
                    <div className="text-(--color-text-primary)">{p.output.memory_usage.rss}</div>
                    <div className="text-(--color-text-tertiary)">Heap:</div>
                    <div className="text-(--color-text-primary)">{p.output.memory_usage.heap_used}</div>
                </div>
            ) : p.state === 'output-error' ? (
                <div className="text-red-500 flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                    Error: {p.errorText}
                </div>
            ) : null}
        </div>
    );
};
