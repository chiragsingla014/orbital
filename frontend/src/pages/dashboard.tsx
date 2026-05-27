import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { Card } from "../components/content/Card"
import { CreateContentModal } from "../components/content/CreateContentModal"
import { PlusIcon } from "../icons/PlusIcon"
import { Sidebar } from "../components/Sidebar"
import { useContent } from "../hooks/useContent"
import { useLocation } from "react-router-dom";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const [filter, setFilter] = useState<{ kind?: string | null; priority?: string | null; tag?: string | null }>(
    location.state?.filter ?? {}
  );
  const { contents, refresh } = useContent();

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
    <div className="relative">
      {/* Mobile overlay — outside flex container so it's never treated as a flex child */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div className={`
          fixed top-0 left-0 h-full z-30 transition-transform duration-300
          md:static md:translate-x-0 md:z-auto
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
          <Sidebar
            onSelect={(f) => { setFilter(f); setSidebarOpen(false); }}
            tags={allTags}
          />
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 min-w-0">
          <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />

          <div className="flex items-center justify-between gap-4 mb-4">
            {/* Hamburger — mobile only */}
            <button
              className="md:hidden p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-200 transition-colors"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="ml-auto">
              <Button
                onClick={() => setModalOpen(true)}
                variant="primary"
                text="Add Content"
                startIcon={<PlusIcon />}
              />
            </div>
          </div>

          <div className="columns-[18rem] gap-4 mt-4">
            {filteredContents.map((content) => (
              <Card key={content._id} content={content} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}