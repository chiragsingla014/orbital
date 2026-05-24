import { ReactElement } from "react";

export function SidebarItem({text, icon, onClick}: {
    text: string;
    icon: ReactElement;
    onClick?: () => void;
}) {
    return <div onClick={onClick} className="flex text-gray-700 py-2 cursor-pointer hover:bg-gray-200 rounded max-w-48 pl-4 transition-all duration-150">
        <div className="pr-2">
            {icon}
        </div>
        <div>
         {text}
        </div>
    </div>
}