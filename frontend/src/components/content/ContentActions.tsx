interface ContentActionsProps {
    editing: boolean;
    saving: boolean;
    isPrivate: boolean;
    onSave: () => void;
    onCancel: () => void;
    onDelete: () => void;
    onCopyLink: () => void;
    onEdit: () => void;
}

export function ContentActions({
    editing, saving, isPrivate,
    onSave, onCancel, onDelete, onCopyLink, onEdit,
}: ContentActionsProps) {
    return (
        <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
            {editing ? (
                <>
                    <button
                        onClick={onCancel}
                        className="px-4 py-1.5 text-sm rounded border text-gray-600 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSave}
                        disabled={saving}
                        className="px-4 py-1.5 text-sm rounded bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50"
                    >
                        {saving ? "Saving..." : "Save"}
                    </button>
                </>
            ) : (
                <>
                    <button
                        onClick={onDelete}
                        className="px-4 py-1.5 text-sm rounded border border-red-300 text-red-500 hover:bg-red-50"
                    >
                        Delete
                    </button>
                    <button
                        onClick={onCopyLink}
                        className={`px-4 py-1.5 text-sm rounded border transition-colors ${
                            isPrivate
                                ? "border-gray-200 text-gray-400 cursor-not-allowed"
                                : "border-blue-300 text-blue-500 hover:bg-blue-50"
                        }`}
                    >
                        {isPrivate ? "🔒 Private" : "📋 Copy Link"}
                    </button>
                    <button
                        onClick={onEdit}
                        className="px-4 py-1.5 text-sm rounded bg-purple-600 text-white hover:bg-purple-700"
                    >
                        Edit
                    </button>
                </>
            )}
        </div>
    );
}