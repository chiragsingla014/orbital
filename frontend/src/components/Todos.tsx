



export function Todos({content}){
    return <div>
        {content.todos && content.todos.map((todo)=>
            <div>
                <div className="text-md">{`• ${todo.title}`}</div>
                <div className="text-sm pl-3">{`${todo.desc}`}</div>
            </div>
        )}
    </div>
}