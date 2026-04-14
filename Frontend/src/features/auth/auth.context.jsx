import { createContext, useState, useEffect } from "react";
import { getMe } from "./services/auth.api";

export const AuthContext = createContext()



export const AuthProvider = ({ children }) => { 

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let isMounted = true;
        const fetchUser = async () => {
            try {
                const data = await getMe();
                if (isMounted && data && data.user) {
                    setUser(data.user);
                }
            } catch (error) {
                console.log("Not logged in");
                // Only wipe user if we haven't just successfully logged in
                if (isMounted) setUser((prev) => prev ? prev : null);
            } finally {
                if (isMounted) setLoading(false);
            }
        }
        fetchUser();
        return () => { isMounted = false; }
    }, []);



    return (
        <AuthContext.Provider value={{user,setUser,loading,setLoading}} >
            {children}
        </AuthContext.Provider>
    )

    
}