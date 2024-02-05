import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});
    const [project, setProject] = useState({
        id: ''
    });

    useEffect(() => {
        !JSON.parse(sessionStorage.getItem('project')) ? sessionStorage.setItem('project', JSON.stringify(project)) : setProject(JSON.parse(sessionStorage.getItem('project')));
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