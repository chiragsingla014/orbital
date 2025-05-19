import { ShareIcon } from "../icons/ShareIcon";
import { Network } from "./Network";
import { Note } from "./Note";
import { Stream } from "./Stream";
import { Todos } from "./Todos";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Card({content} : any) {
    console.log(content);
    return <div>
        <div className="p-4 bg-white rounded-md border-gray-200 max-w-72  border min-h-48 min-w-72">
            <div className="flex justify-between">
                <div className="flex items-center text-md">
                    <div className="text-gray-500 pr-2">
                        <ShareIcon />
                    </div>
                    {content.title}
                </div>
                <div className="flex items-center">
                    <div className="pr-2 text-gray-500">
                        {/* <a href={contents.link} target="_blank">
                            <ShareIcon />
                        </a> */}
                    </div>
                    <div className="text-gray-500">
                        <ShareIcon />
                    </div>
                </div>
            </div>

            <div className="pt-4">
                {content.kind === "stream" && <Stream content={content}/>}

                {content.kind === "network" && <Network content={content}/>}

                {content.kind === "note" && <Note content={content}/>}

                {content.kind === "todos" && content.todos && <Todos content={content}/>}
            </div>

        </div>
    </div>
}