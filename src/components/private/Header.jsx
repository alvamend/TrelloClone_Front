import { useEffect, useState } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import WorkspaceHeaderList from "./WorkspaceHeaderList";
import Create from "./floating-divs/Create";

const FETCH_URL = 'workspace';
const Header = ({ workspaces, setWorkspaces }) => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const logout = useLogout();

    const toggleWorkspaceMenu = (e) => {
        if (document.querySelector('#floating-menu-create').style.display === 'block') {
            document.querySelector('#floating-menu-create').style.display = 'none';
        }
        if (document.querySelector('#floating-menu-workspaces').style.display === 'block') {
            document.querySelector('#floating-menu-workspaces').style.display = 'none';
            e.target.classList.remove('active')
        } else if (document.querySelector('#floating-menu-workspaces').style.display = 'none') {
            document.querySelector('#floating-menu-workspaces').style.display = 'block';
            e.target.classList.add('active')
        };
    }

    const toggleCreateMenu = (e) => {
        if (document.querySelector('#floating-menu-workspaces').style.display === 'block') {
            document.querySelector('#floating-menu-workspaces').style.display = 'none';
            document.querySelector('#workspace-btn').classList.remove('active')
        }
        if (document.querySelector('#floating-menu-create').style.display === 'block') {
            document.querySelector('#floating-menu-create').style.display = 'none';
        } else if (document.querySelector('#floating-menu-create').style.display = 'none') {
            document.querySelector('#floating-menu-create').style.display = 'block';
        };
    }

    const toggleSettingsMenu = (e) => {
        if (document.querySelector('#floating-menu-avatar').style.display === 'block') {
            document.querySelector('#floating-menu-avatar').style.display = 'none';
        } else if (document.querySelector('#floating-menu-avatar').style.display = 'none') {
            document.querySelector('#floating-menu-avatar').style.display = 'block';
        };
    }

    return (
        <>
            <header className="header">
                <div style={{ display: 'flex' }}>
                    <div className="img-logo" onClick={e => navigate('/home')}>
                        <img src="/img/logo-trello.png" style={{ cursor: 'pointer' }} />
                    </div>

                    <div className="navbar">
                        <div style={{ position: 'relative' }}>
                            <button onClick={toggleWorkspaceMenu} id="workspace-btn">Workspaces <img src="/img/flecha-hacia-abajo.png" /></button>
                            <WorkspaceHeaderList workspaces={workspaces} />
                        </div>

                        <div style={{ position: 'relative' }}>
                            <button style={{ backgroundColor: 'var(--primary-dark)', width: '100px', height: '40px' }}
                                onClick={toggleCreateMenu}
                            >Create</button>
                            <div id="floating-menu-create">
                                <ul className="create-list">
                                    <li onClick={e => {
                                        document.querySelector('#floating-menu-create').style.display = 'none'
                                        document.querySelector('.modal-background').style.display = 'flex';
                                        document.querySelector('#create-board').style.display = 'block';
                                    }}>
                                        <h4>Create board</h4>
                                        <p>A board is made up of cards ordered on lists. Use it to manage projects, track information, or organize anything</p>
                                    </li>
                                    <li onClick={e => {
                                        document.querySelector('#floating-menu-create').style.display = 'none'
                                        document.querySelector('.modal-background').style.display = 'flex';
                                        document.querySelector('#create-workspace').style.display = 'block';
                                    }}>
                                        <h4>Create Workspace</h4>
                                        <p>A workspace is a space of boards and people. Use it to organize your company, side hustle, family, or friends.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="browser_avatar">
                    <form>
                        <input style={{ width: '250px', textAlign: 'start', paddingLeft: '10px' }} type="text" placeholder="Search" />
                    </form>
                    <div className="avatar" style={{ marginLeft: '20px' }}>
                        <h5 onClick={toggleSettingsMenu}>Avatar</h5>
                        <div id="floating-menu-avatar">
                            <h5>Account</h5><hr />
                            <div>
                                <h5>{auth.username}</h5>
                                <h5 style={{ color: 'gray' }}>{auth.email}</h5>
                                <ul className="avatar-list">
                                    <li className="avatar-list_item">
                                        <div className="list-icon">
                                            <img src="/img/configuracion.png" alt="settings" />
                                        </div>
                                        <p>Settings</p>
                                    </li>
                                    <li className="avatar-list_item"
                                        onClick={e => {
                                            logout();
                                            navigate('/login');
                                        }}>
                                        <div className="list-icon">
                                            <img src="/img/cerrar-sesion.png" alt="logout" />
                                        </div>
                                        <p>Logout</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <Create workspaces={workspaces} setWorkspaces={setWorkspaces} />
        </>
    )
};

export default Header;