import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";

export interface TodoItem {
    _id?: string;
    title: string;
    desc: string;
    done: boolean;
}

export interface ContentData {
    _id: string;
    title: string;
    kind: string;
    note?: string;
    link?: string;
    todos?: TodoItem[];
    nodes?: any[];
    tags?: any[];
    priority?: string;
    private?: boolean;
}

export function useContentEditor(id: string | undefined, isShared: boolean) {
    const navigate = useNavigate();

    const [content, setContent] = useState<ContentData | null>(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    // editable fields
    const [title, setTitle] = useState("");
    const [noteBody, setNoteBody] = useState("");
    const [link, setLink] = useState("");
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [priority, setPriority] = useState("medium");
    const [isPrivate, setIsPrivate] = useState(true);
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");

    useEffect(() => { loadContent(); }, [id]);

    async function loadContent() {
        setLoading(true);
        try {
            const url = isShared
                ? `${BACKEND_URL}/api/v1/share/${id}`
                : `${BACKEND_URL}/api/v1/content/${id}`;
            const headers = isShared ? {} : { Authorization: localStorage.getItem("token") };
            const res = await axios.get(url, { headers });
            setContent(res.data);
            hydrate(res.data);
        } catch {
            if (!isShared) navigate("/dashboard");
        } finally {
            setLoading(false);
        }
    }

    function hydrate(data: ContentData) {
        setTitle(data.title ?? "");
        setNoteBody(data.note ?? "");
        setLink(data.link ?? "");
        setTodos(data.todos ?? []);
        setPriority(data.priority ?? "medium");
        setIsPrivate(data.private ?? true);
        setTags((data.tags ?? []).map((t: any) => typeof t === "string" ? t : (t.tag ?? "")));
    }

    async function handleSave() {
        if (!content) return;
        setSaving(true);
        try {
            const payload: Record<string, unknown> = {
                title, kind: content.kind, priority, private: isPrivate, tags,
            };
            if (content.kind === "note")   payload.note  = noteBody;
            if (content.kind === "stream") payload.link  = link;
            if (content.kind === "todos")  payload.todos = todos;

            const res = await axios.patch(`${BACKEND_URL}/api/v1/content/${id}`, payload, {
                headers: { Authorization: localStorage.getItem("token") }
            });
            setContent(res.data);
            hydrate(res.data);
            setEditing(false);
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete() {
        if (!confirm("Delete this content?")) return;
        await axios.delete(`${BACKEND_URL}/api/v1/content/${id}`, {
            headers: { Authorization: localStorage.getItem("token") }
        });
        navigate("/dashboard");
    }

    function handleCancel() {
        if (content) hydrate(content);
        setTagInput("");
        setEditing(false);
    }

    async function handleCopyLink() {
        if (!content) return;
        if (content.private) {
            alert("Set content to Public before sharing.");
            return;
        }
        await navigator.clipboard.writeText(`${window.location.origin}/share/${content._id}`);
        alert("Share link copied!");
    }

    async function patchNodes(nodes: string[]) {
        const res = await axios.patch(`${BACKEND_URL}/api/v1/content/${id}`,
            { kind: "network", nodes },
            { headers: { Authorization: localStorage.getItem("token") } }
        );
        setContent(res.data);
        hydrate(res.data);
    }

    async function handleAddToNetwork(newIds: string[]) {
        const existing = (content?.nodes ?? []).map((n: any) => n._id ?? n);
        await patchNodes([...existing, ...newIds]);
    }

    async function handleRemoveFromNetwork(nodeId: string) {
        const existing = (content?.nodes ?? []).map((n: any) => n._id ?? n);
        await patchNodes(existing.filter((nid: string) => nid !== nodeId));
    }

    // todo helpers
    function updateTodo(i: number, field: "title" | "desc" | "done", val: string | boolean) {
        setTodos(todos.map((t, idx) => idx === i ? { ...t, [field]: val } : t));
    }
    function addTodo() { setTodos([...todos, { title: "", desc: "", done: false }]); }
    function removeTodo(i: number) { setTodos(todos.filter((_, idx) => idx !== i)); }

    async function toggleDone(i: number) {
        const updated = todos.map((t, idx) => idx === i ? { ...t, done: !t.done } : t);
        setTodos(updated);
        await axios.patch(`${BACKEND_URL}/api/v1/content/${id}`,
            { kind: content?.kind, todos: updated },
            { headers: { Authorization: localStorage.getItem("token") } }
        );
    }

    // tag helpers
    function addTag() {
        const trimmed = tagInput.trim();
        if (trimmed && !tags.includes(trimmed)) setTags([...tags, trimmed]);
        setTagInput("");
    }
    function removeTag(tag: string) { setTags(tags.filter(t => t !== tag)); }

    return {
        // state
        content, loading, editing, saving,
        title, setTitle,
        noteBody, setNoteBody,
        link, setLink,
        todos, priority, setPriority,
        isPrivate, setIsPrivate,
        tags, tagInput, setTagInput,
        // actions
        setEditing,
        handleSave, handleDelete, handleCancel, handleCopyLink,
        handleAddToNetwork, handleRemoveFromNetwork,
        updateTodo, addTodo, removeTodo, toggleDone,
        addTag, removeTag,
    };
}