import { Card } from "./Card";
import { AddExistingModal } from "./AddExistingModal";
import { CreateContentModal } from "./CreateContentModal";

interface NetworkNodesProps {
    nodes: any[];
    isShared: boolean;
    currentNodeIds: string[];
    onAddExisting: (ids: string[]) => void;
    onRemove: (nodeId: string) => void;
    onAfterCreate: (newId?: string) => void;
    addExistingOpen: boolean;
    setAddExistingOpen: (v: boolean) => void;
    createNewOpen: boolean;
    setCreateNewOpen: (v: boolean) => void;
}

export function NetworkNodes({
    nodes,
    isShared,
    currentNodeIds,
    onAddExisting,
    onRemove,
    onAfterCreate,
    addExistingOpen,
    setAddExistingOpen,
    createNewOpen,
    setCreateNewOpen,
}: NetworkNodesProps) {
    return (
        <>
            <div className="columns-[18rem] gap-4">
                {nodes.map((node: any) => (
                    <div key={node._id} className="break-inside-avoid mb-4">
                        <Card
                            content={node}
                            onRemove={!isShared ? () => onRemove(node._id) : undefined}
                        />
                    </div>
                ))}
                {nodes.length === 0 && (
                    <p className="text-sm text-gray-400">No connected content yet.</p>
                )}
            </div>

            <AddExistingModal
                open={addExistingOpen}
                onClose={() => setAddExistingOpen(false)}
                currentNodes={currentNodeIds}
                onAdd={onAddExisting}
            />
            <CreateContentModal
                open={createNewOpen}
                onClose={(newId?: string) => {
                    setCreateNewOpen(false);
                    if (newId) onAfterCreate(newId);
                }}
            />
        </>
    );
}