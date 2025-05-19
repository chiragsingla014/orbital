import { Note } from "./Note";
import { Stream } from "./Stream";
import { Todos } from "./Todos";


export function Network({content}){
    return <div>
        {content.nodes.map((content)=><div>
                            {content.kind === "stream" && <Stream content={content}/>}
            
                            {content.kind === "note" && <Note content={content}/>}
            
                            {content.kind === "todos" && content.todos && <Todos content={content}/>}
            </div>)}
    </div>
}