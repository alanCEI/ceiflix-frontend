import { createContext, useState } from "react";
import { useNavigate } from 'react-router';

export const AuthContext = createContext();

// Obtain data from LocalStorage
const getUser = () => {
    const localStorageUser = localStorage.getItem('user');
    return localStorageUser ? JSON.parse(localStorageUser) : null;
}

const BACKEND_API = import.meta.env.VITE_BACKEND_API;

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(getUser);
    const isLoggedIn = user !== null;
    const navigate = useNavigate();
    const login = async (data) => {
        const response = await fetch(`${BACKEND_API}/user/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();

        if (!response.ok || responseData.status === "error") {
            throw new Error(responseData.msg)
        }
        console.log(responseData)

        localStorage.setItem('token', responseData.data.token);
        delete responseData.data.token;
        localStorage.setItem('user', JSON.stringify(responseData.data));
        setUser(response.data)
        navigate("/profile");
    }

    const register = async (data) => {
        const response = await fetch(`${BACKEND_API}/user/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();

        if (!response.ok || responseData.status === "error") {
            throw new Error(responseData.msg)
        }
        console.log(responseData)

        await login({ email: data.email, password: data.password })
    }
    return (
        <AuthContext.Provider value={{ user, register, login, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )
};
export default AuthContextProvider;