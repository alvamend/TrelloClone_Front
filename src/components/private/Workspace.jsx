import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const Workspace = () => {

    const workspaceId = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [workspace, setWorkspace] = useState({})
    const { auth, project, setProject } = useAuth();

    useEffect(() => {
        const getWorkspace = async () => {
            try {
                const response = await axios(`workspace/${workspaceId.id}`, {
                    headers: {
                        Authorization: auth.accessToken
                    }
                });

                if (response?.status === 200) {
                    setWorkspace(response?.data);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error(error);
            }
        };

        getWorkspace();

        return () => {
            setWorkspace({});
        }
    }, []);

    useEffect(() => {

        const renderWorkspace = async () => {
            try {
                const response = await axios(`workspace/${project?._id}`, {
                    headers: {
                        Authorization: auth.accessToken
                    }
                });
                if (response?.status === 200) {
                    setWorkspace(response?.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        renderWorkspace();

    }, [project])

    return (
        isLoading
            ? <h4>Loading...</h4>
            : <>
                <div className="title_workspace">
                    <h1>{workspace.title}</h1>
                    <img src="/img/boligrafo.png" alt="edit" />
                </div>
                <div className="privacy_workspace">
                    <img src={workspace.privacy === 'public' ? '/img/tierra.png' : '/img/candado.png'} alt="privacy" />
                    <p style={{ textTransform: 'capitalize' }}>{workspace.privacy}</p>
                </div>
                <hr/>
                <section>
                    <h2>Your Boards</h2>
                </section>
            </>
    )
}

export default Workspace;