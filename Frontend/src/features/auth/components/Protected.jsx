import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import React from 'react'

const Protected = ({children}) => {
    const { loading,user } = useAuth()


    if(loading){
        return (<main><h1>Loading...</h1></main>)
    }

    if(!user){
        return (
            <main style={{backgroundColor: 'black', color: 'red', border: '5px solid red', padding: "50px", width: "100vw", height: "100vh"}}>
                <h1>FATAL ERROR: Protected Route Blocked You!</h1>
                <p>The code reached the Protected route, but the 'user' object is NULL.</p>
                <p>This means your login was "successful", but the user data failed to save to the context, or the context resets!</p>
                <p>Please check your backend API response, or tell me about this red screen!</p>
            </main>
        )
    }
    
    return children
}

export default Protected