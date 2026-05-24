import { TodoItem } from "../../hooks/useContentEditor";

interface TodoListProps {
    todos: TodoItem[];
    editing: boolean;
    isShared: boolean;
    updateTodo: (i: number, field: "title" | "desc" | "done", val: string | boolean) => void;
    addTodo: () => void;
    removeTodo: (i: number) => void;
    toggleDone: (i: number) => void;
}

export function TodoList({ todos, editing, isShared, updateTodo, addTodo, removeTodo, toggleDone }: TodoListProps) {
    return (
        <div className="flex flex-col gap-3">
            {todos.map((todo, i) => (
                <div
                    key={i}
                    className={`p-3 rounded-lg border ${todo.done ? "bg-green-50 border-green-200" : "bg-gray-50"}`}
                >
                    {editing ? (
                        <div className="flex flex-col gap-1">
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
                        </div>
                    ) : (
                        <div className="flex items-start gap-3">
                            {!isShared ? (
                                <input
                                    type="checkbox"
                                    checked={todo.done}
                                    onChange={() => toggleDone(i)}
                                    className="mt-1 cursor-pointer accent-green-500"
                                />
                            ) : (
                                <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 ${todo.done ? "bg-green-500 border-green-500" : "border-gray-400"}`} />
                            )}
                            <div>
                                <p className={`font-medium text-sm ${todo.done ? "line-through text-gray-400" : "text-gray-800"}`}>
                                    {todo.title}
                                </p>
                                {todo.desc && (
                                    <p className="text-xs text-gray-500 mt-0.5">{todo.desc}</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            ))}
            {editing && (
                <button onClick={addTodo} className="text-sm text-blue-500 text-left">+ Add todo</button>
            )}
        </div>
    );
}