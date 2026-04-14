import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout } from "../services/auth.api";



export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context


    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await login({ email, password })
            
            if (data && data.user) {
                setUser(data.user)
            } else if (data) {
                // Fallback for older backend versions that might return flat data
                alert("DEBUG WARNING: Backend did not return a 'user' object securely. Returned: " + JSON.stringify(data));
                setUser(data)
            } else {
                throw new Error("Backend returned no data");
            }
            
            return { success: true }
        } catch (err) {
            return { success: false, error: err }
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            const data = await register({ username, email, password })
            setUser(data.user)
            return { success: true }
        } catch (err) {
            return { success: false, error: err }
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            const data = await logout()
            setUser(null)
            return { success: true }
        } catch (err) {
            return { success: false, error: err }
        } finally {
            setLoading(false)
        }
    }

    return { user, loading, handleRegister, handleLogin, handleLogout }
}