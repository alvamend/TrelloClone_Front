import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useEffect } from "react";
import Layout from "../Layout";

const RequireAuth = () => {

    const { auth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(auth.username === undefined){
            navigate('/login');
        }
    }, []);

    return(
        auth.username
            ? (
                <Layout />
            )
            : <h1>Not enough privileges</h1>
    )

}

export default RequireAuth;