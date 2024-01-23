import { createContext, useState } from "react";

export const AuthContext = createContext({});

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});
    const [project, setProject] = useState({});

    return(
        <AuthContext.Provider value={{
            auth,
            setAuth,
            project,
            setProject
        }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider;