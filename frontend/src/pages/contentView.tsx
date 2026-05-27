import { useParams, useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { ContentMeta } from "../components/content/ContentMeta";
import { ContentActions } from "../components/content/ContentActions";
import { TodoList } from "../components/content/TodoList";
import { NetworkNodes } from "../components/content/NetworkNodes";
import { useContentEditor } from "../hooks/useContentEditor";
import { useState } from "react";
import { PlusIcon } from "../icons/PlusIcon";

export function ContentView({ isShared = false }: { isShared?: boolean }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const e = useContentEditor(id, isShared);
    const [addExistingOpen, setAddExistingOpen] = useState(false);
    const [createNewOpen, setCreateNewOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const sidebarTags: string[] = (e.content?.tags ?? [])
        .map((t: any) => typeof t === "string" ? t : (t.tag ?? ""))
        .filter(Boolean);

    async function handleAfterCreate(newId?: string) {
        if (!newId) return;
        await e.handleAddToNetwork([newId]);
    }

    if (e.loading) return (
        <div className="h-screen w-screen flex justify-center items-center text-gray-400">
            Loading...
        </div>
    );

    if (!e.content) return (
        <div className="h-screen w-screen flex flex-col justify-center items-center gap-4 text-gray-400">
            <p>Content not found or no longer available.</p>
            {!isShared && (
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 text-sm text-purple-600 hover:underline"
                >
                    ← Back
                </button>
            )}
        </div>
    );

    const currentNodeIds = (e.content.nodes ?? []).map((n: any) => n._id ?? n);

    return (
        <div className="relative">
            {/* Mobile overlay */}
            {sidebarOpen && !isShared && (
                <div
                    className="fixed inset-0 bg-black/40 z-20 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div className="flex min-h-screen bg-gray-100">
                {/* Sidebar */}
                {!isShared && (
                    <div className={`
                        fixed top-0 left-0 h-full z-30 transition-transform duration-300
                        md:static md:translate-x-0 md:z-auto
                        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                    `}>
                        <Sidebar
                            onSelect={(filter) => {
                                navigate("/dashboard", { state: { filter } });
                                setSidebarOpen(false);
                            }}
                            tags={sidebarTags}
                        />
                    </div>
                )}

                {/* Main content */}
                <div className="flex-1 p-4 md:p-8 min-w-0">
                    {/* Top bar — hamburger + back button */}
                    <div className="flex items-center gap-3 mb-6">
                        {!isShared && (
                            <button
                                className="md:hidden p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-200 transition-colors flex-shrink-0"
                                onClick={() => setSidebarOpen(true)}
                                aria-label="Open menu"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        )}
                        <button
                            onClick={() => isShared ? navigate("/") : navigate(-1)}
                            className="text-sm text-purple-600 hover:underline"
                        >
                            ← {isShared ? "Home" : "Back"}
                        </button>
                    </div>

                    <div className="max-w-2xl mx-auto bg-white rounded-xl border p-6 shadow-sm">

                        {/* Header */}
                        <div className="flex items-start justify-between mb-4 gap-4">
                            <div className="flex-1">
                                {e.editing
                                    ? <input
                                        className="text-2xl font-semibold border-b text-gray-900 border-purple-400 outline-none w-full"
                                        value={e.title}
                                        onChange={ev => e.setTitle(ev.target.value)}
                                      />
                                    : <h1 className="text-2xl text-gray-900 font-semibold">{e.content.title}</h1>
                                }
                            </div>
                            <span className="text-xs text-white bg-purple-500 rounded-full px-3 py-1 capitalize flex-shrink-0">
                                {e.content.kind}
                            </span>
                        </div>

                        <ContentMeta
                            editing={e.editing}
                            priority={e.priority}
                            setPriority={e.setPriority}
                            isPrivate={e.isPrivate}
                            setIsPrivate={e.setIsPrivate}
                            tags={e.tags}
                            tagInput={e.tagInput}
                            setTagInput={e.setTagInput}
                            addTag={e.addTag}
                            removeTag={e.removeTag}
                            contentPriority={e.content.priority ?? "medium"}
                            contentPrivate={e.content.private ?? true}
                            contentTags={sidebarTags}
                        />

                        {/* Stream */}
                        {e.content.kind === "stream" && (
                            e.editing
                                ? <input
                                    className="w-full border rounded p-2 text-sm"
                                    value={e.link}
                                    onChange={ev => e.setLink(ev.target.value)}
                                    placeholder="YouTube embed URL"
                                  />
                                : <div className="aspect-video w-full">
                                    <iframe src={e.content.link} className="w-full h-full rounded-lg" allowFullScreen />
                                  </div>
                        )}

                        {/* Note */}
                        {e.content.kind === "note" && (
                            e.editing
                                ? <textarea
                                    className="w-full border rounded p-2 text-sm resize-none"
                                    rows={8}
                                    value={e.noteBody}
                                    onChange={ev => e.setNoteBody(ev.target.value)}
                                  />
                                : <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                                    {e.content.note}
                                  </p>
                        )}

                        {/* Todos */}
                        {e.content.kind === "todos" && (
                            <TodoList
                                todos={e.todos}
                                editing={e.editing}
                                isShared={isShared}
                                updateTodo={e.updateTodo}
                                addTodo={e.addTodo}
                                removeTodo={e.removeTodo}
                                toggleDone={e.toggleDone}
                            />
                        )}

                        {/* Network summary + add buttons */}
                        {e.content.kind === "network" && (
                            <div className="flex items-center justify-between pt-2">
                                <p className="text-sm text-gray-500">
                                    {e.content.nodes?.length ?? 0} connected item{(e.content.nodes?.length ?? 0) !== 1 ? "s" : ""}
                                </p>
                                {!isShared && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setCreateNewOpen(true)}
                                            className="text-xs px-3 py-1.5 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 inline-flex items-center gap-1"
                                        >
                                            <PlusIcon /> Create New
                                        </button>
                                        <button
                                            onClick={() => setAddExistingOpen(true)}
                                            className="text-xs px-3 py-1.5 rounded bg-purple-600 text-white hover:bg-purple-700 inline-flex items-center gap-1"
                                        >
                                            <PlusIcon /> Add Existing
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {!isShared && (
                            <ContentActions
                                editing={e.editing}
                                saving={e.saving}
                                isPrivate={e.content.private ?? true}
                                onSave={e.handleSave}
                                onCancel={e.handleCancel}
                                onDelete={e.handleDelete}
                                onCopyLink={e.handleCopyLink}
                                onEdit={() => e.setEditing(true)}
                            />
                        )}
                    </div>

                    {/* Network nodes */}
                    {e.content.kind === "network" && (
                        <div className="mt-8">
                            <NetworkNodes
                                nodes={e.content.nodes ?? []}
                                isShared={isShared}
                                currentNodeIds={currentNodeIds}
                                onAddExisting={e.handleAddToNetwork}
                                onRemove={e.handleRemoveFromNetwork}
                                onAfterCreate={handleAfterCreate}
                                addExistingOpen={addExistingOpen}
                                setAddExistingOpen={setAddExistingOpen}
                                createNewOpen={createNewOpen}
                                setCreateNewOpen={setCreateNewOpen}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}