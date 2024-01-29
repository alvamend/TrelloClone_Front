import { useEffect, useState } from "react"
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Sidebar = ({ workspaces }) => {

    const { auth, project, setProject } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const params = useParams();
    const PATH_URL = `/workspace/${params.id}`;

    const showCreateBoard = (e) => {
        document.querySelector('#floating-menu-create').style.display = 'none'
        document.querySelector('.modal-background').style.display = 'flex';
        document.querySelector('#create-board').style.display = 'block';
    }

    return (
        <aside className="sidebar">
            <div className="sidebar-items">
                {
                    project?._id
                        ? (
                            <>
                                <section>
                                    <h3>Workspace Menu</h3>
                                    <ul className="workspace-list">
                                        <li className="avatar-list_item" onClick={e => {
                                            navigate(`${PATH_URL}/b`)}
                                        }>
                                            <div className="list-icon">
                                                <img src="/img/tablero.png" />
                                            </div>
                                            <p>Boards</p>
                                        </li>
                                        <li className="avatar-list_item" onClick={e => {
                                            navigate(`${PATH_URL}/m`)}
                                        }>
                                            <div className="list-icon">
                                                <img src="/img/usuario.png" />
                                            </div>
                                            <p>Members</p>
                                        </li>
                                        <li className="avatar-list_item" onClick={e => {
                                            navigate(`${PATH_URL}/s`)}
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
                                        <h3>Your boards</h3>
                                        <strong style={{ cursor: 'pointer' }}
                                            onClick={showCreateBoard}
                                        >+</strong>
                                    </div>
                                    <ul className="workspace-list">

                                    </ul>
                                </section>
                            </>
                        )
                        : (
                            <>
                                <h4>Workspaces</h4>
                                <ul className="workspace-list">
                                    {workspaces.map(workspace => (
                                        <li key={workspace._id}>{workspace.title}</li>
                                    ))}
                                </ul>
                            </>
                        )
                }
            </div>
        </aside>
    )
}

export default Sidebar