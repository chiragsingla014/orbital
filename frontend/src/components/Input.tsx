import { Ref } from "react";

interface InputProps { 
    placeholder: string; 
    reference?: Ref<HTMLInputElement>;
}

export function Input({placeholder, reference}: InputProps) {
    return <div>
        <input ref={reference} placeholder={placeholder} type={"text"} className="px-4 py-2 border rounded m-2" ></input>
    </div>
}