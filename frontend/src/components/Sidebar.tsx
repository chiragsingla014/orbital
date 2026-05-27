import { Logo } from "../icons/Logo";
import { NetworkIcon } from "../icons/NetworkIcon";
import { NotesIcon } from "../icons/NotesIcon";
import { TodosIcon } from "../icons/TodosIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

const PRIORITIES = ["high", "medium", "low"];
const priorityColors: Record<string, string> = {
    high: "bg-red-100 text-red-600",
    medium: "bg-yellow-100 text-yellow-600",
    low: "bg-green-100 text-green-600",
};

interface SidebarProps {
    onSelect: (filter: { kind?: string | null; priority?: string | null; tag?: string | null }) => void;
    tags: string[];
}

export function Sidebar({ onSelect, tags }: SidebarProps) {
    return (
        <div className="h-screen bg-white border-r w-72 pl-6 overflow-y-auto flex flex-col">
            <div
                className="flex text-2xl text-gray-900 pt-8 items-center cursor-pointer hover:text-purple-600 transition-colors"
                onClick={() => onSelect({ kind: null, priority: null, tag: null })}
            >
                <div className="pr-2 text-purple-600"><Logo /></div>
                ORBITAL
            </div>

            <div className="pt-8 pl-4">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Type</p>
                <SidebarItem text="Network" icon={<NetworkIcon />} onClick={() => onSelect({ kind: "network" })} />
                <SidebarItem text="Notes"   icon={<NotesIcon />}   onClick={() => onSelect({ kind: "note" })} />
                <SidebarItem text="Todos"   icon={<TodosIcon />}   onClick={() => onSelect({ kind: "todos" })} />
                <SidebarItem text="Embeds"  icon={<YoutubeIcon />} onClick={() => onSelect({ kind: "stream" })} />
            </div>

            <div className="pt-6 pl-4">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Priority</p>
                {PRIORITIES.map(p => (
                    <div
                        key={p}
                        onClick={() => onSelect({ priority: p })}
                        className="flex items-center gap-2 py-1.5 cursor-pointer hover:text-purple-600 transition-colors"
                    >
                        <span className={`text-xs px-2 py-0.5 rounded-full capitalize font-medium ${priorityColors[p]}`}>
                            {p}
                        </span>
                    </div>
                ))}
            </div>

            {tags.length > 0 && (
                <div className="pt-6 pl-4 pb-8">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Tags</p>
                    {tags.map(tag => (
                        <div
                            key={tag}
                            onClick={() => onSelect({ tag })}
                            className="flex items-center gap-1 py-1 cursor-pointer text-sm text-gray-600 hover:text-purple-600 transition-colors"
                        >
                            <span className="text-purple-400">#</span>{tag}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}