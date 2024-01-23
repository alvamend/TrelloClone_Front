import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const Workspace = () => {

    const workspace = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const { auth } = useAuth();

    useEffect(() => {
        const getWorkspace = async () => {
            try {
                const response = await axios(`workspace/${workspace.id}`, {
                    headers: {
                        Authorization: auth.accessToken
                    }
                });

                console.log(response?.data);
            } catch (error) {
                console.error(error);
            }
        };

        getWorkspace();
    }, [])

    return (
        <h1>WORKSPACE</h1>
    )
}

export default Workspace;