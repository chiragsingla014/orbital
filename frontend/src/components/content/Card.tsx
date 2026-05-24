import { Stream } from "./Stream";
import { useNavigate } from "react-router-dom";

const priorityColors: Record<string, string> = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
};

interface CardProps {
    content: any;
    onDelete?: () => void;   // from Dashboard — deletes the content entirely
    onRemove?: () => void;   // from NetworkNodes — removes from network only
}

export function Card({ content, onDelete, onRemove }: CardProps) {
    const navigate = useNavigate();

    // whichever action is available — remove takes priority if both somehow passed
    const action = onRemove ?? onDelete;
    const actionLabel = onRemove ? "Remove from network" : "Delete";

    return (
        <div
            className="bg-white rounded-xl border border-gray-200 min-w-72 max-w-72 cursor-pointer hover:shadow-md transition-shadow overflow-hidden break-inside-avoid mb-4"
            onClick={() => navigate(`/content/${content._id}`)}
        >
            {/* Title bar */}
            <div className="px-4 pt-4 pb-3 border-b border-gray-100">
                <div className="flex items-start justify-between gap-2">
                    <h2 className="font-semibold text-gray-900 text-base truncate flex-1">
                        {content.title}
                    </h2>
                    {action && (
                        <button
                            onClick={e => { e.stopPropagation(); action(); }}
                            className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 text-base leading-none"
                            title={actionLabel}
                        >
                            ✕
                        </button>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full capitalize font-medium ${priorityColors[content.priority ?? "medium"]}`}>
                        {content.priority ?? "medium"}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${content.private ? "bg-gray-100 text-gray-500" : "bg-blue-100 text-blue-600"}`}>
                        {content.private ? "🔒" : "🌐"}
                    </span>
                    {(content.tags ?? []).slice(0, 2).map((t: any) => {
                        const tag = typeof t === "string" ? t : (t.tag ?? "");
                        return tag ? (
                            <span key={tag} className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                                #{tag}
                            </span>
                        ) : null;
                    })}
                    {(content.tags ?? []).length > 2 && (
                        <span className="text-xs text-gray-400">+{content.tags.length - 2}</span>
                    )}
                </div>
            </div>

            {/* Content preview */}
            <div className="px-4 py-3">
                {content.kind === "stream" && <Stream content={content} />}

                {content.kind === "note" && (
                    <p className="text-sm text-gray-600 line-clamp-3">{content.note}</p>
                )}

                {content.kind === "todos" && content.todos && (
                    <div className="flex flex-col gap-1.5">
                        {content.todos.slice(0, 4).map((todo: any, i: number) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className={`w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 ${todo.done ? "bg-green-500 border-green-500" : "border-gray-300"}`} />
                                <span className={`text-sm truncate ${todo.done ? "line-through text-gray-400" : "text-gray-700"}`}>
                                    {todo.title}
                                </span>
                            </div>
                        ))}
                        {content.todos.length > 4 && (
                            <p className="text-xs text-gray-400 mt-0.5">+{content.todos.length - 4} more</p>
                        )}
                    </div>
                )}

                {content.kind === "network" && (
                    <div className="flex flex-col gap-1.5 max-h-36 overflow-y-auto pr-1">
                        {(content.nodes ?? []).map((node: any) => (
                            <div key={node._id} className="flex items-center justify-between py-1 border-b border-gray-50 last:border-0">
                                <span className="text-sm text-gray-700 truncate flex-1">{node.title}</span>
                                <span className="text-xs text-gray-400 capitalize ml-2 flex-shrink-0">{node.kind}</span>
                            </div>
                        ))}
                        {(!content.nodes || content.nodes.length === 0) && (
                            <p className="text-xs text-gray-400">No connected nodes</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}