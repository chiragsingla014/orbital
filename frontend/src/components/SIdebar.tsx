
import { Logo } from "../icons/Logo";
import { NetworkIcon } from "../icons/NetworkIcon";
import { NotesIcon } from "../icons/NotesIcon";
import { TodosIcon } from "../icons/TodosIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar() {
    return <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6">
        <div className="flex text-2xl pt-8 items-center">
            <div className="pr-2 text-purple-600">
                <Logo />
            </div>
            ORBITAL
        </div>
        <div className="pt-8 pl-4">
            <SidebarItem text="Network" icon={<NetworkIcon />} />
            <SidebarItem text="Notes" icon={<NotesIcon />} />
            <SidebarItem text="Todos" icon={<TodosIcon />} />
            <SidebarItem text="Youtube" icon={<YoutubeIcon />} />
        </div>
    </div>
}