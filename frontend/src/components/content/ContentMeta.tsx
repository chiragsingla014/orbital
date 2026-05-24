const PRIORITIES = ["low", "medium", "high"];

const priorityColors: Record<string, string> = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
};

interface ContentMetaProps {
    editing: boolean;
    priority: string;
    setPriority: (p: string) => void;
    isPrivate: boolean;
    setIsPrivate: (v: boolean) => void;
    tags: string[];
    tagInput: string;
    setTagInput: (v: string) => void;
    addTag: () => void;
    removeTag: (tag: string) => void;
    contentPriority: string;
    contentPrivate: boolean;
    contentTags: string[];
}

export function ContentMeta({
    editing, priority, setPriority,
    isPrivate, setIsPrivate,
    tags, tagInput, setTagInput, addTag, removeTag,
    contentPriority, contentPrivate, contentTags,
}: ContentMetaProps) {
    return (
        <div className="flex flex-wrap items-center gap-2 mb-6">

            {/* Priority */}
            {editing ? (
                <div className="flex gap-1">
                    {PRIORITIES.map(p => (
                        <button
                            key={p}
                            onClick={() => setPriority(p)}
                            className={`text-xs px-2 py-1 rounded-full capitalize border transition-colors ${
                                priority === p
                                    ? priorityColors[p] + " border-transparent font-semibold"
                                    : "border-gray-200 text-gray-400 hover:border-gray-400"
                            }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            ) : (
                <span className={`text-xs px-2 py-1 rounded-full capitalize font-medium ${priorityColors[contentPriority ?? "medium"]}`}>
                    {contentPriority ?? "medium"}
                </span>
            )}

            {/* Private / Public */}
            {editing ? (
                <button
                    onClick={() => setIsPrivate(!isPrivate)}
                    className={`text-xs px-2 py-1 rounded-full border transition-colors ${
                        isPrivate ? "bg-gray-100 text-gray-600 border-gray-200" : "bg-blue-100 text-blue-600 border-transparent"
                    }`}
                >
                    {isPrivate ? "🔒 Private" : "🌐 Public"}
                </button>
            ) : (
                <span className={`text-xs px-2 py-1 rounded-full ${contentPrivate ? "bg-gray-100 text-gray-500" : "bg-blue-100 text-blue-600"}`}>
                    {contentPrivate ? "🔒 Private" : "🌐 Public"}
                </span>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-1 items-center">
                {(editing ? tags : contentTags).map(tag => (
                    <span key={tag} className="flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                        #{tag}
                        {editing && (
                            <button onClick={() => removeTag(tag)} className="hover:text-red-500">✕</button>
                        )}
                    </span>
                ))}
                {editing && (
                    <div className="flex gap-1">
                        <input
                            className="text-xs border rounded px-2 py-0.5 w-24 outline-none"
                            placeholder="Add tag"
                            value={tagInput}
                            onChange={e => setTagInput(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && addTag()}
                        />
                        <button onClick={addTag} className="text-xs text-purple-600 hover:underline">Add</button>
                    </div>
                )}
            </div>
        </div>
    );
}