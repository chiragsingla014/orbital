import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { Card } from "../components/content/Card"
import { CreateContentModal } from "../components/content/CreateContentModal"
import { PlusIcon } from "../icons/PlusIcon"
import { Sidebar } from "../components/Sidebar"
import { useContent } from "../hooks/useContent"
import { useLocation } from "react-router-dom";
// import { useDarkMode } from "../hooks/useDarkMode";

export function Dashboard() {
    const [modalOpen, setModalOpen] = useState(false);
    const location = useLocation();
    const [filter, setFilter] = useState<{ kind?: string | null; priority?: string | null; tag?: string | null }>(
        location.state?.filter ?? {}
    );
    const { contents, refresh } = useContent();
    // const { dark, toggle } = useDarkMode();

    useEffect(() => {
        refresh();
    }, [modalOpen]);

    const allTags = Array.from(new Set(
        contents.flatMap(c => (c.tags ?? []).map((t: any) => typeof t === "string" ? t : t.tag))
    ));

    const filteredContents = contents.filter(c => {
        if (filter.kind && c.kind !== filter.kind) return false;
        if (filter.priority && c.priority !== filter.priority) return false;
        if (filter.tag) {
            const contentTags = (c.tags ?? []).map((t: any) => typeof t === "string" ? t : t.tag);
            if (!contentTags.includes(filter.tag)) return false;
        }
        return true;
    });

    return (
        <div>
            <Sidebar onSelect={setFilter} tags={allTags} />
            <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
                <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />
                <div className="flex justify-end gap-4 mb-4">
                    {/* <button
                        onClick={toggle}
                        className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-200 transition-colors text-sm"
                    >
                        {dark ? "☀️ Light" : "🌙 Dark"}
                    </button> */}
                    <Button onClick={() => setModalOpen(true)} variant="primary" text="Add Content" startIcon={<PlusIcon />} />
                </div>
                <div className="columns-[18rem] gap-4 mt-4">
                    {filteredContents.map((content) => (
                        <Card key={content._id} content={content} />
                    ))}
                </div>
            </div>
        </div>
    );
}