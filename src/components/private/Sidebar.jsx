import { useEffect, useState } from "react"
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useNavigateProject from "../../hooks/useNavigateProject";

const Sidebar = ({ workspaces }) => {

    const { auth, project, setProject } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [selectedWorkspace, setSelectedWorkspace] = useState({});
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const navigateToProject = useNavigateProject();

    const showCreateBoard = (e) => {
        document.querySelector('#floating-menu-create').style.display = 'none'
        document.querySelector('.modal-background').style.display = 'flex';
        document.querySelector('#create-board').style.display = 'block';
    }

    useEffect(() => {

        const fetchData = async () => {
            if (project.id) {
                try {
                    const response = await axiosPrivate(`workspace/${project.id}`);
                    if (response?.status === 200) {
                        setSelectedWorkspace(response?.data);
                        setIsLoading(false);
                    }
                } catch (error) {
                    console.error(error);
                }
            } else {
                setIsLoading(false);
            }
        };

        fetchData();

    }, [project]);

    return (
        isLoading
            ? 'Loading...'
            : (
                <aside className="sidebar">
                    <div className="sidebar-items">
                        {
                            project.id === ''
                                ? (
                                    <>
                                        <h4 style={{color:'var(--primary-dark)'}}>Workspaces</h4>
                                        <ul className="workspace-list">
                                            {workspaces.map(workspace => (
                                                <li key={workspace._id} onClick={e => navigateToProject(workspace._id)}> {workspace.title}</li>
                                            ))}
                                        </ul>
                                    </>
                                )
                                :
                                selectedWorkspace?._id
                                && (
                                    <>
                                        <section>
                                            <h3 style={{ color: 'var(--primary-dark)' }}>Workspace Menu</h3>
                                            <ul className="workspace-list">
                                                <li className="avatar-list_item" onClick={e => {
                                                    navigate(`/workspace/${project.id}/b`)
                                                }
                                                }>
                                                    <div className="list-icon">
                                                        <img src="/img/tablero.png" />
                                                    </div>
                                                    <p>Boards</p>
                                                </li>
                                                <li className="avatar-list_item" onClick={e => {
                                                    navigate(`/workspace/${project.id}/m`)
                                                }
                                                }>
                                                    <div className="list-icon">
                                                        <img src="/img/usuario.png" />
                                                    </div>
                                                    <p>Members</p>
                                                </li>
                                                <li className="avatar-list_item" onClick={e => {
                                                    navigate(`/workspace/${project.id}/s`)
                                                }
                                                }>
                                                    <div className="list-icon">
                                                        <img src="/img/configuracion.png" />
                                                    </div>
                                                    <p>Workspace Settings</p>
                                                </li>
                                            </ul>
                                        </section>
                                        <section>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '20px' }}>
                                                <h3 style={{ color: 'var(--primary-dark)' }}>Your boards</h3>
                                                <strong style={{ cursor: 'pointer' }}
                                                    onClick={showCreateBoard}
                                                >+</strong>
                                            </div>
                                            <ul className="workspace-list">
                                                {(selectedWorkspace?.boards && selectedWorkspace?.boards.length > 0) && (
                                                    selectedWorkspace.boards.map(board => (
                                                        <li key={board._id} onClick={e => {
                                                            document.querySelector('.content').style.backgroundColor = board.background;
                                                            navigate(`/board/${board._id}`);
                                                        }
                                                        } style={{ display: 'flex', alignItems: 'center' }}>
                                                            <div style={{ background: `${board.background}`, height: '20px', aspectRatio: '1/1', borderRadius: '3px', marginRight: '10px' }}>
                                                            </div>
                                                            <p>{board.title}</p>
                                                        </li>
                                                    ))
                                                )}
                                            </ul>
                                        </section>
                                    </>
                                )
                        }
                    </div>
                </aside >
            )
    )
}

export default Sidebar

// ARREGLAR BUG, NO MUESTRA EL HOME