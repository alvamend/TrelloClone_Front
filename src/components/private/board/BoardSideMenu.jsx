import { useEffect, useRef, useState } from "react";
import Backgrounds from "./Backgrounds";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";

const URL = 'board';
const BoardSideMenu = ({ board, setBoard }) => {

    const descriptionRef = useRef();
    const [descriptionValue, setDescriptionValue] = useState('');
    const [message, setMessage] = useState('');
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const successDiv = document.querySelector('.successModal');
        window.onclick = function (event) {
            if (event.target !== successDiv) {
                successDiv.style.display = 'none'
            }
        }
    }, [])

    const toggleSubMenus = (menuName) => {
        if (document.querySelector('#submenu').style.transform === 'translateX(360px)') {
            document.querySelector('#submenu').style.transform = 'translateX(720px)';
            document.querySelector('#submenu_info').style.display = 'none';
            document.querySelector('#submenu_settings').style.display = 'none';
            document.querySelector('#submenu_background').style.display = 'none';
        } else if (document.querySelector('#submenu').style.transform === 'translateX(720px)') {
            document.querySelector('#submenu').style.transform = 'translateX(360px)'

            if (menuName === '#submenu_info') {
                if (document.querySelector('#submenu_info').style.display === 'none') {
                    document.querySelector('#submenu_info').style.display = 'block'
                } else if (document.querySelector('#submenu_info').style.display === 'block') {
                    document.querySelector('#submenu_info').style.display = 'none'
                }
            }

            if (menuName === '#submenu_settings') {
                if (document.querySelector('#submenu_settings').style.display === 'none') {
                    document.querySelector('#submenu_settings').style.display = 'block'
                } else if (document.querySelector('#submenu_settings').style.display === 'block') {
                    document.querySelector('#submenu_settings').style.display = 'none'
                }
            }

            if (menuName === '#submenu_background') {
                if (document.querySelector('#submenu_background').style.display === 'none') {
                    document.querySelector('#submenu_background').style.display = 'block'
                } else if (document.querySelector('#submenu_background').style.display === 'block') {
                    document.querySelector('#submenu_background').style.display = 'none'
                }
            }
        }
    }

    const enableEditDescription = (e) => {
        descriptionRef.current.disabled = false;
        descriptionRef.current.focus();
    }

    const sendEdit = async (e) => {
        if (e.key === 'Enter') {
            try {
                const response = await axiosPrivate.put(`${URL}/${board._id}`, {
                    description: descriptionValue
                }, {
                    headers: {
                        Authorization: auth.acessToken
                    }
                });
                console.log(response?.data);
                if (response?.status === 200) {
                    setMessage('Description was updated')
                    document.querySelector('.successModal').style.display = 'block'
                    descriptionRef.current.disabled = true;
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            setDescriptionValue(e.target.value);
        }
    }

    const addMember = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosPrivate.put(`${URL}/add-member/${board._id}`, {
                email: e.target.email.value,
                boardRole: e.target.boardRole.value
            }, {
                headers: {
                    Authorization: auth.accessToken
                }
            });
            if (response?.status === 200) {
                document.querySelector('#add-member-board').style.display = 'none'
                setMessage('Member added to the board, refresh to see changes');
                document.querySelector('.successModal').style.display = 'block'
            }
        } catch (error) {
            console.error(error);
        }
    }

    const editPrivacy = async (value) => {
        try {
            const response = await axiosPrivate.put(`${URL}/${board._id}`,{
                privacy: value
            }, {
                headers: {
                    Authorization: auth.accessToken
                }
            });
            if(response?.status === 200){
                setBoard({
                    ...board,
                    privacy: value
                });
                document.querySelector('#edit-privacy-board').style.display = 'none'
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            {/* Board menu */}
            <aside className="board-sidemenu">
                <h2 style={{ textAlign: 'center' }}>Menu</h2><hr />
                <ul>
                    <li className="board-sidemenu_item" onClick={e => toggleSubMenus('#submenu_info')}>
                        <div className="board-sidemenu_item--icon">
                            <img src="/img/informacion.png" alt="Info" />
                        </div>
                        <p>About this board</p>
                    </li>
                    <li className="board-sidemenu_item">
                        <div className="board-sidemenu_item--icon">
                            <img src="/img/documento.png" alt="Activity" />
                        </div>
                        <p>Activity</p>
                    </li>
                </ul><hr />
                <ul>
                    <li className="board-sidemenu_item" onClick={e => toggleSubMenus('#submenu_settings')}>
                        <div className="board-sidemenu_item--icon">
                            <img src="/img/configuracion.png" alt="Settings" />
                        </div>
                        <p>Settings</p>
                    </li>
                    <li className="board-sidemenu_item" onClick={e => toggleSubMenus('#submenu_background')}>
                        <div className="board-sidemenu_item--icon">
                            <img src="/img/pintura.png" alt="Background" />
                        </div>
                        <p>Change background</p>
                    </li>
                </ul><hr />
                <ul>
                    <li className="board-sidemenu_item">
                        <div className="board-sidemenu_item--icon">
                            <img src="/img/compartir.png" alt="Share" />
                        </div>
                        <p>Share</p>
                    </li>
                    <li className="board-sidemenu_item">
                        <div className="board-sidemenu_item--icon">
                            <img src="/img/borrar.png" alt="Delete" />
                        </div>
                        <p>Delete board</p>
                    </li>
                </ul>
            </aside>

            <aside id="submenu" className="board-sidemenu" style={{ transform: 'translateX(720px)', backgroundColor: 'rgba(0,0,0,1)' }}>
                {/* BOARD INFORMATION */}
                <section id="submenu_info" style={{ display: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h3 style={{ textAlign: 'center' }}>About this board</h3>
                        <p className="close" onClick={e => { toggleSubMenus('#submenu_info') }}>x</p>
                    </div><hr />
                    <section>
                        <h4>Board admins</h4>
                        <ul>
                            {
                                board.members.map(member => (
                                    (member.boardRole === 'administrator') && (
                                        <li key={member._id} >
                                            <h4>{member?.user?.name} {member?.user?.surname}</h4>
                                            <p style={{color:'darkgray'}}>@{member?.user?.username}</p>
                                        </li>
                                    )
                                ))
                            }
                        </ul>
                    </section><hr />
                    <section>
                        <h4>Description</h4>
                        <textarea
                            disabled
                            className="b-description"
                            ref={descriptionRef}
                            defaultValue={board.description}
                            onKeyDown={sendEdit}>
                        </textarea>
                    </section><hr />
                    <section>
                        <h4>Collaborators</h4>
                        <ul>
                            {
                                board.members.map(member => (
                                    (member.boardRole !== 'administrator') && (
                                        <li key={member._id}>
                                            <h4>{member?.user?.name} {member?.user?.surname}</h4>
                                            <p style={{color:'darkgray'}}>@{member?.user?.username}</p>
                                        </li>
                                    )
                                ))
                            }
                        </ul>
                    </section><hr />
                    <section style={{ position: 'relative' }}>
                        <h4>Actions</h4>
                        <ul>
                            <li><strong style={{ cursor: 'pointer' }} onClick={enableEditDescription}>Edit description</strong></li>
                            <li><strong style={{ cursor: 'pointer' }} onClick={e => {
                                document.querySelector('#add-member-board').style.display = 'block'
                            }}>Add member</strong></li>
                        </ul>
                        <div className="floating_div_board_menu" id="add-member-board">
                            <form onSubmit={addMember}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <label>Email</label>
                                    <input type="email" placeholder="Type an email" name="email" required />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
                                    <label>Role</label>
                                    <select name="boardRole">
                                        <option value='collaborator'>Collaborator</option>
                                        <option value='administrator'>Administrator</option>
                                    </select>
                                </div>
                                <input type="submit" value='Add' />
                                <p style={{ backgroundColor: 'red', margin: '0 auto', marginTop: '10px', height: '26px', width: '200px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }} onClick={e => {
                                    document.querySelector('#add-member-board').style.display = 'none'
                                }}>Cancel</p>
                            </form>
                        </div>
                    </section>
                </section>

                {/* BOARD SETTINGS */}
                <section id="submenu_settings" style={{ display: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h3 style={{ textAlign: 'center' }}>Settings</h3>
                        <p className="close" onClick={e => toggleSubMenus('#submenu_settings')}>x</p>
                    </div><hr />
                    <section>
                        <h4>Privacy</h4>
                        <p style={{ textTransform: 'capitalize', color:'darkgray' }}>{board.privacy}</p>
                        <h4 style={{ fontStyle: 'italic', marginTop: '10px' }}>Privacy information</h4>
                        <ul>
                            <li>
                                <p style={{color:'darkgray'}}>Private. Only MEMBERS of the board are allowed to access to it</p>
                            </li>
                            <li style={{ marginTop: '10px' }}>
                                <p style={{color:'darkgray'}}>Workspace. Any MEMBER of the current workspace is able to access the board</p>
                            </li>
                            <li style={{ marginTop: '10px' }}>
                                <p style={{color:'darkgray'}}>Public. Anyone with the link can access to it, but can't modify as only members of the board and users with administrator role are able to edit</p>
                            </li>
                        </ul>
                    </section><hr />
                    <section>
                        <h4>Actions</h4>
                        <ul>
                            <li><strong style={{ cursor: 'pointer' }} onClick={e => document.querySelector('#edit-privacy-board').style.display = 'block'} >Edit privacy</strong></li>
                        </ul>
                        <div className="floating_div_board_menu" id="edit-privacy-board">
                            <ul>
                                <li onClick={e => editPrivacy('private')}>Private</li>
                                <li onClick={e => editPrivacy('workspace')}>Workspace</li>
                                <li onClick={e => editPrivacy('public')}>Public</li>
                            </ul>
                        </div>
                    </section>
                </section>

                {/* BACKGROUND SETTINGS */}
                <section id="submenu_background" style={{ display: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h3 style={{ textAlign: 'center' }}>Change background</h3>
                        <p className="close" onClick={e => toggleSubMenus('#submenu_background')}>x</p>
                    </div><hr />
                    <div>
                        <h4>Colors</h4>
                        <div className="backgrounds-container">
                            <Backgrounds gradient='linear-gradient(315deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)' board={board} />
                            <Backgrounds gradient='linear-gradient(315deg, rgba(204,94,0,1) 0%, rgba(255,160,0,1) 35%, rgba(255,250,0,1) 100%)' board={board} />
                            <Backgrounds gradient='linear-gradient(315deg, rgba(0,144,255,1) 0%, rgba(144,255,221,1) 35%, rgba(60,249,255,1) 100%)' board={board} />
                            <Backgrounds gradient='linear-gradient(315deg, rgba(241,142,255,1) 0%, rgba(232,84,255,1) 35%, rgba(87,0,147,1) 100%)' board={board} />
                            <Backgrounds gradient='linear-gradient(315deg, rgba(0,0,0,1) 0%, rgba(109,71,115,1) 35%, rgba(0,0,0,1) 100%)' board={board} />
                            <Backgrounds gradient='linear-gradient(315deg, rgba(52,0,0,1) 0%, rgba(154,24,24,1) 35%, rgba(255,0,0,1) 100%)' board={board} />
                        </div>
                    </div>
                </section>

            </aside>
            {/* Floating modal */}
            <div className="successModal">
                <p style={{ textAlign: 'end', color: 'white', cursor: 'pointer' }} onClick={e => {
                    document.querySelector('.successModal').style.display = 'none'
                }}>X</p>
                <p style={{ color: 'white', fontWeight: 'bold' }}>{message}</p>
            </div>
        </>
    )
};

export default BoardSideMenu;