import {createContext, useState, useEffect} from "react";
import jwt_decode from "jwt-decode";

const AuthContext = createContext(null);

export default AuthContext;

export const AuthContextProvider = ({children}) => {

    const [username, setUsername] = useState(localStorage.getItem('username'));
    const [balance, setBalance] = useState(localStorage.getItem('balance'));
    const [token, setToken] = useState(localStorage.getItem('access_token'));
    const [debug, setDebug] = useState(true);

    const baseUrl = debug ? 'http://127.0.0.1:8000/' : '/';

    useEffect(() => {
        if (token) {
            localStorage.setItem("access_token", token);
            const decoded = jwt_decode(token);
            localStorage.setItem("username", decoded.username);
            localStorage.setItem("balance", decoded.balance);
            setUsername(decoded.username);
            setBalance(decoded.balance);
        } else {
            localStorage.removeItem('access_token');
            localStorage.removeItem('username');
            localStorage.removeItem('balance');
            setUsername(null);
            setBalance(null);
        }

    }, [token]);

    return (
        <AuthContext.Provider value={{
            baseUrl: baseUrl,
            name: username,
            token:token,
            setToken: setToken,
            balance: balance,
            setBalance: setBalance
        }}>
            {children}
        </AuthContext.Provider>
    );}