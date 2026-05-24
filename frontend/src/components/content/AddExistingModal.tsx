import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config";
import axios from "axios";

interface AddExistingModalProps {
    open: boolean;
    onClose: () => void;
    currentNodes: string[];
    onAdd: (ids: string[]) => void;
}

export function AddExistingModal({ open, onClose, currentNodes, onAdd }: AddExistingModalProps) {
    const [allContents, setAllContents] = useState<any[]>([]);
    const [selected, setSelected] = useState<string[]>([]);

    useEffect(() => {
        if (!open) return;
        setSelected([]);
        axios.get(`${BACKEND_URL}/api/v1/content/`, {
            headers: { Authorization: localStorage.getItem("token") }
        }).then(res => setAllContents(res.data));
    }, [open]);

    if (!open) return null;

    const available = allContents.filter(c => !currentNodes.includes(c._id));

    function toggle(id: string) {
        setSelected(prev => prev.includes(id) ? prev.filter(n => n !== id) : [...prev, id]);
    }

    return (
        <div>
            <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 z-10" />
            <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center z-20">
                <div className="bg-white p-4 rounded shadow-lg w-96 max-h-[80vh] flex flex-col">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="font-semibold">Add Existing Content</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
                    </div>
                    <div className="flex-1 overflow-y-auto flex flex-col gap-1 border rounded p-2">
                        {available.length === 0
                            ? <p className="text-sm text-gray-400">No content available to add.</p>
                            : available.map(c => (
                                <label key={c._id} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 p-1 rounded">
                                    <input
                                        type="checkbox"
                                        checked={selected.includes(c._id)}
                                        onChange={() => toggle(c._id)}
                                    />
                                    <span className="flex-1">{c.title}</span>
                                    <span className="text-xs text-gray-400 capitalize">{c.kind}</span>
                                </label>
                            ))
                        }
                    </div>
                    <div className="flex justify-end gap-2 mt-3">
                        <button onClick={onClose} className="px-3 py-1.5 text-sm rounded border text-gray-600 hover:bg-gray-50">
                            Cancel
                        </button>
                        <button
                            onClick={() => { onAdd(selected); onClose(); }}
                            disabled={selected.length === 0}
                            className="px-3 py-1.5 text-sm rounded bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50"
                        >
                            Add {selected.length > 0 ? `(${selected.length})` : ""}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}