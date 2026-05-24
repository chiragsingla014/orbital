import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Dashboard } from "./pages/dashboard"
import { Test } from "./pages/test"
import { ContentView } from "./pages/contentView"

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const token = localStorage.getItem("token");
    if (!token) return <Navigate to="/signin" replace />;
    return <>{children}</>;
}

function GuestRoute({ children }: { children: React.ReactNode }) {
    const token = localStorage.getItem("token");
    if (token) return <Navigate to="/dashboard" replace />;
    return <>{children}</>;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signup" element={
                    <GuestRoute><Signup /></GuestRoute>
                } />
                <Route path="/signin" element={
                    <GuestRoute><Signin /></GuestRoute>
                } />
                <Route path="/dashboard" element={
                    <ProtectedRoute><Dashboard /></ProtectedRoute>
                } />
                <Route path="/content/:id" element={
                    <ProtectedRoute><ContentView /></ProtectedRoute>
                } />
                <Route path="/share/:id" element={
                    <ContentView isShared={true} />
                } />
                <Route path="/test" element={<Test />} />
                {/* catch-all MUST be last */}
                <Route path="*" element={
                    <Navigate to={localStorage.getItem("token") ? "/dashboard" : "/signin"} replace />
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default App