import {createContext, PropsWithChildren, ReactNode, useContext, useEffect, useState} from "react";
import {login, logout, validateToken} from "../services/api.ts";

type AuthContext = {
    authToken?: string | null;
    // currentUser?: User | null;
    handleLogin: () => Promise<void>;
    handleLogout: () => void;
}

const AuthContext = createContext<AuthContext | undefined>(undefined)

interface loginCredentials {
    username: string,
    password: string
}

export interface User {
    username: string,
    role: string
}

interface Props {
    children: ReactNode
}

export default function AuthProvider({children}: Props) {

    const [currentUser, setCurrentUser] = useState<User | null>();

    // calls a backend endpoint which sets the httpOnly cookie and returns the details of the user
    const handleLogin = async (credentials: loginCredentials) => {
        try {
            const token = await login(credentials);
            let user: User = {username: token.user, role: token.role}

            setCurrentUser(user)
        } catch (e) {
            setCurrentUser(null)
        }
    }

    // use effect for persisting login, calling an API endpoint which accesses the
    // added cookie whose name is "authToken" as per the function param in the Spring controller
    // validates the authToken cookie value and returns
    // the user details from the token.
    useEffect(() => {
        const validate = async () => {
            try{
                const user: User = await validateToken();
                setCurrentUser(user)
            } catch (e){
                setCurrentUser(null)
            }
        };
        validate()
    }, [])

    const handleLogout = () => {
        logout()
        setCurrentUser(null);
    }

    return <AuthContext.Provider value={{
        handleLogin, handleLogout, currentUser
    }}>
        {children}
    </AuthContext.Provider>
}


export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used inside of an AuthProvider component")
    }

    return context;
}