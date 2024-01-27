import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Workspace = () => {

    const workspaceId = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [workspace, setWorkspace] = useState({})
    const { auth, project } = useAuth();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const getWorkspace = async () => {
            try {
                const response = await axiosPrivate.get(`workspace/${workspaceId.id}`, {
                    headers: {
                        Authorization: auth.accessToken
                    }
                });

                if (response?.status === 200) {
                    document.title = response?.data?.title;
                    setWorkspace(response?.data);
                    setIsLoading(false);
                }
            } catch (error) {
                if (error?.response?.status === 403) {
                    navigate('/login');
                }
            }
        };

        getWorkspace();

        return () => {
            setWorkspace({});
        }
    }, []);

    useEffect(() => {
        const workspaceToUse = project?._id ? project?._id : workspaceId.id;
        const renderWorkspace = async () => {
            try {
                const response = await axiosPrivate.get(`workspace/${workspaceToUse}`, {
                    headers: {
                        Authorization: auth.accessToken
                    }
                });
                if (response?.status === 200) {
                    document.title = response?.data?.title;
                    setWorkspace(response?.data);
                }
            } catch (error) {
                if (error?.response?.status === 403) {
                    navigate('/login');
                }
            }
        };

        renderWorkspace();

    }, [project]);

    console.log(workspace);

    return (
        isLoading
            ? <h4>Loading...</h4>
            : <>
                <div style={{ display: 'flex' }}>
                    <div style={{ width: 'calc(100% - 200px)' }}>
                        <div className="title_workspace">
                            <h1>{workspace.title}</h1>
                            <img src="/img/boligrafo.png" alt="edit" />
                        </div>
                        <div className="privacy_workspace">
                            <img src={workspace.privacy === 'public' ? '/img/tierra.png' : '/img/candado.png'} alt="privacy" />
                            <p style={{ textTransform: 'capitalize' }}>{workspace.privacy}</p>
                        </div>
                    </div>
                    <div style={{ width: '200px' }}>
                        <button className="add-member">+ Add Member</button>
                    </div>
                </div>
                <hr />
                <section className="workspace__information--board">
                    <h2>Boards</h2>
                    <div className="boards-list">
                        <div className="board-item" style={{backgroundColor:'gray'}}>
                            <h4>Create new board</h4>
                        </div>
                        {(workspace?.boards && workspace?.boards.length) > 0 && (
                            workspace.boards.map(board => (
                                <div key={board._id} className="board-item" style={{backgroundColor:`${board.background}`}}>
                                    <h4>{board.title}</h4>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </>
    )
}

export default Workspace;