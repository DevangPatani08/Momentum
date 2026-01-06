import { useEffect, useState } from "react";
import { AuthServices } from '../services/auth.js';
import { AuthContext } from './AuthContext.jsx';

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const data = await AuthServices.getMe();
                    localStorage.setItem('user', JSON.stringify({ firstName: data.firstName, lastName: data.lastName, email: data.email }));
                    setUser(data);
                }
            } catch (error) {
                console.error(error);
                localStorage.removeItem('token');
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    const login = async (credentials) => {
        const res = await AuthServices.login(credentials);
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', res.user);
        setUser(res.user);

        return res;
    };

    const register = async (data) => {
        try {
            const res = await AuthServices.register(data);
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', res.user);
            setUser(res.user);

            return res;
        } catch (error) {
            console.error(`Registration Error: ${error.message}`);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const val = { user, loading, login, register, logout };

    return <AuthContext.Provider value={val}>{children}</AuthContext.Provider>;
};