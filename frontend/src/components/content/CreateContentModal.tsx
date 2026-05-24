import { useEffect, useRef, useState } from "react";
import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "../Button";
import { Input } from "../Input";
import { BACKEND_URL } from "../../config";
import axios from "axios";

enum ContentType {
    Stream = "stream",
    Note = "note",
    Todos = "todos",
    Network = "network"
}

interface TodoItem {
    title: string;
    desc: string;
    done: boolean;
}

interface ContentPreview {
    _id: string;
    title: string;
    kind: string;
}

function convertToYoutubeEmbed(urlStr: string): string {
    try {
        const url = new URL(urlStr);
        if (url.hostname === 'www.youtube.com' && url.pathname.startsWith('/embed/')) {
            return urlStr;
        }
        if (url.hostname === 'youtu.be') {
            const videoId = url.pathname.slice(1);
            if (!videoId) return urlStr;
            url.hostname = 'www.youtube.com';
            url.pathname = `/embed/${videoId}`;
            return url.toString();
        }
        if (url.hostname === 'www.youtube.com' || url.hostname === 'youtube.com') {
            const videoId = url.searchParams.get('v');
            if (videoId) {
                url.hostname = 'www.youtube.com';
                url.pathname = `/embed/${videoId}`;
                url.searchParams.delete('v');
                return url.toString();
            }
        }
        return urlStr;
    } catch (e) {
        return urlStr;
    }
}

export function CreateContentModal({ open, onClose }: {
    open: boolean,
    onClose: (newId?: string) => void
}) {
    const titleRef = useRef<HTMLInputElement | null>(null);
    const linkRef = useRef<HTMLInputElement | null>(null);
    const [kind, setKind] = useState(ContentType.Note);
    const [noteBody, setNoteBody] = useState("");
    const [todos, setTodos] = useState<TodoItem[]>([{ title: "", desc: "", done: false }]);
    const [allContents, setAllContents] = useState<ContentPreview[]>([]);
    const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
    const [loadingContents, setLoadingContents] = useState(false);

    // reset all state every time modal opens
    useEffect(() => {
        if (open) {
            setKind(ContentType.Note);
            setNoteBody("");
            setTodos([{ title: "", desc: "", done: false }]);
            setSelectedNodes([]);
            setAllContents([]);
            if (titleRef.current) titleRef.current.value = "";
            if (linkRef.current) linkRef.current.value = "";
        }
    }, [open]);

    function addTodo() { setTodos([...todos, { title: "", desc: "", done: false }]); }
    function updateTodo(i: number, field: "title" | "desc" | "done", val: string | boolean) {
        setTodos(todos.map((t, idx) => idx === i ? { ...t, [field]: val } : t));
    }
    function removeTodo(i: number) { setTodos(todos.filter((_, idx) => idx !== i)); }

    async function fetchContents() {
        setLoadingContents(true);
        try {
            const res = await axios.get(`${BACKEND_URL}/api/v1/content/`, {
                headers: { Authorization: localStorage.getItem("token") }
            });
            setAllContents(res.data);
        } catch (e) {
            console.error("Failed to fetch contents", e);
        } finally {
            setLoadingContents(false);
        }
    }

    function toggleNode(id: string) {
        setSelectedNodes(prev =>
            prev.includes(id) ? prev.filter(n => n !== id) : [...prev, id]
        );
    }

    async function addContent() {
        const title = titleRef.current?.value;
        const headers = { Authorization: localStorage.getItem("token") };

        let payload: Record<string, unknown> = { title, kind };

        if (kind === ContentType.Stream) {
            payload.link = convertToYoutubeEmbed(linkRef.current?.value ?? "");
        } else if (kind === ContentType.Note) {
            payload.note = noteBody;
        } else if (kind === ContentType.Todos) {
            payload.todos = todos
                .filter(t => t.title.trim() !== "")
                .map(t => ({ title: t.title, desc: t.desc, done: t.done }));
        } else if (kind === ContentType.Network) {
            payload.nodes = selectedNodes;
        }

        const res = await axios.post(`${BACKEND_URL}/api/v1/content/`, payload, { headers });
        onClose(res.data._id);
    }

    if (!open) return null;

    return (
        <div>
            <div
                className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 z-10"
                onClick={() => onClose()}
            />
            <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center z-20">
                <div className="bg-white p-4 rounded shadow-lg w-96">
                    <div className="flex justify-end">
                        <div onClick={() => onClose()} className="cursor-pointer"><CrossIcon /></div>
                    </div>

                    <Input reference={titleRef} placeholder="Title" />

                    {/* Kind-specific fields */}
                    {kind === ContentType.Stream && (
                        <Input reference={linkRef} placeholder="YouTube URL" />
                    )}

                    {kind === ContentType.Note && (
                        <textarea
                            className="w-full border rounded p-2 mt-2 text-sm resize-none"
                            rows={4}
                            placeholder="Write your note..."
                            value={noteBody}
                            onChange={e => setNoteBody(e.target.value)}
                        />
                    )}

                    {kind === ContentType.Todos && (
                        <div className="mt-2 flex flex-col gap-2">
                            {todos.map((todo, i) => (
                                <div key={i} className="border rounded p-2 flex flex-col gap-1">
                                    <div className="flex gap-1">
                                        <input
                                            className="flex-1 border rounded p-1 text-sm"
                                            placeholder="Todo title *"
                                            value={todo.title}
                                            onChange={e => updateTodo(i, "title", e.target.value)}
                                        />
                                        <button onClick={() => removeTodo(i)} className="text-red-400 text-xs">✕</button>
                                    </div>
                                    <input
                                        className="w-full border rounded p-1 text-sm"
                                        placeholder="Description (optional)"
                                        value={todo.desc}
                                        onChange={e => updateTodo(i, "desc", e.target.value)}
                                    />
                                    <label className="flex items-center gap-1 text-sm text-gray-500">
                                        <input
                                            type="checkbox"
                                            checked={todo.done}
                                            onChange={e => updateTodo(i, "done", e.target.checked)}
                                        />
                                        Mark as done
                                    </label>
                                </div>
                            ))}
                            <button onClick={addTodo} className="text-sm text-blue-500 mt-1 text-left">+ Add todo</button>
                        </div>
                    )}

                    {kind === ContentType.Network && (
                        <div className="mt-2 flex flex-col gap-1 max-h-48 overflow-y-auto border rounded p-2">
                            {loadingContents
                                ? <p className="text-sm text-gray-400">Loading...</p>
                                : allContents.length === 0
                                    ? <p className="text-sm text-gray-400">No content found.</p>
                                    : allContents.map(c => (
                                        <label key={c._id} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 p-1 rounded">
                                            <input
                                                type="checkbox"
                                                checked={selectedNodes.includes(c._id)}
                                                onChange={() => toggleNode(c._id)}
                                            />
                                            <span className="flex-1">{c.title}</span>
                                            <span className="text-xs text-gray-400 capitalize">{c.kind}</span>
                                        </label>
                                    ))
                            }
                        </div>
                    )}

                    {/* Kind selector */}
                    <h1 className="mt-3 font-medium">Kind</h1>
                    <div className="flex gap-1 justify-center pb-2">
                        <Button text="Note" variant={kind === ContentType.Note ? "primary" : "secondary"} onClick={() => setKind(ContentType.Note)} />
                        <Button text="Todos" variant={kind === ContentType.Todos ? "primary" : "secondary"} onClick={() => setKind(ContentType.Todos)} />
                        <Button text="Stream" variant={kind === ContentType.Stream ? "primary" : "secondary"} onClick={() => setKind(ContentType.Stream)} />
                        <Button text="Network" variant={kind === ContentType.Network ? "primary" : "secondary"} onClick={() => {
                            setKind(ContentType.Network);
                            fetchContents();
                        }} />
                    </div>

                    <div className="flex justify-center">
                        <Button onClick={addContent} variant="primary" text="Submit" />
                    </div>
                </div>
            </div>
        </div>
    );
}