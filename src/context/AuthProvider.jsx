import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});
    const [project, setProject] = useState({});

    useEffect(() => {
        !sessionStorage.getItem('project') ? sessionStorage.setItem('project', null) : setProject(JSON.parse(sessionStorage.getItem('project')));
    },[])

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