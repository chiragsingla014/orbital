import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function useContent() {
    const [contents, setContents] = useState([]);

    const refresh = useCallback(() => {
        axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then((response) => {
            setContents(response.data);
        });
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return { contents, refresh };
}