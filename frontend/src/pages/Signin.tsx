import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export function Signin() {
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();

    async function signin() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const response = await axios.post(BACKEND_URL + "/api/v1/user/signin", { username, password });
        const jwt = response.data.token;
        localStorage.setItem("token", `Bearer ${jwt}`);
        navigate("/dashboard");
    }

    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl border min-w-48 p-8">
                <h2 className="text-xl font-semibold text-center mb-4">Sign In</h2>
                <Input reference={usernameRef} placeholder="Username" />
                <Input reference={passwordRef} placeholder="Password" />
                <div className="flex justify-center pt-4">
                    <Button onClick={signin} loading={false} variant="primary" text="Signin" fullWidth={true} />
                </div>
                <p className="text-sm text-center text-gray-500 mt-4">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-purple-600 hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
}