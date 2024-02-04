import { useEffect, useRef, useState } from "react";
import Backgrounds from "./Backgrounds";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";

const URL = 'board';
const BoardSideMenu = ({ board, setBoard }) => {

    const descriptionRef = useRef();
    const [descriptionValue, setDescriptionValue] = useState('');
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const successDiv = document.querySelector('.successModal');
        window.onclick = function (event) {
            if(event.target !== successDiv){
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
                    document.querySelector('.successModal').style.display = 'block'
                    descriptionRef.current.disable = true;
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            setDescriptionValue(e.target.value);
        }
    }

    return (
        <>
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
                                        <li key={member.user._id}>
                                            <h4>{member?.user?.name} {member?.user?.surname}</h4>
                                            <p>@{member?.user?.username}</p>
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
                        <h4>Board members</h4>
                        <ul>
                            {
                                board.members.map(member => (
                                    <li key={member.user._id}>
                                        <h4>{member?.user?.name} {member?.user?.surname}</h4>
                                        <p>@{member?.user?.username}</p>
                                    </li>
                                ))
                            }
                        </ul>
                    </section><hr />
                    <section>
                        <h4>Actions</h4>
                        <ul>
                            <li><strong style={{ cursor: 'pointer' }} onClick={enableEditDescription}>Edit description</strong></li>
                            <li><strong style={{ cursor: 'pointer' }}>Add member</strong></li>
                        </ul>
                    </section>
                </section>

                {/* BOARD SETTINGS */}
                <section id="submenu_settings" style={{ display: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h3 style={{ textAlign: 'center' }}>Settings</h3>
                        <p className="close" onClick={e => toggleSubMenus('#submenu_settings')}>x</p>
                    </div><hr />
                    {/* <section>
                        <h4>Board admins</h4>
                        <ul>
                            {
                                board.members.map(member => (
                                    (member.boardRole === 'administrator') && (
                                        <li key={member.user._id}>
                                            <h4>{member?.user?.name} {member?.user?.surname}</h4>
                                            <p>@{member?.user?.username}</p>
                                        </li>
                                    )
                                ))
                            }
                        </ul>
                    </section><hr />
                    <section>
                        <h4>Description</h4>
                        <p style={{ marginTop: '15px' }}>{board.description}</p>
                    </section> */}
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
            <div className="successModal">
                <p style={{ textAlign: 'end', color: 'white', cursor: 'pointer' }} onClick={e => {
                    document.querySelector('.successModal').style.display = 'none'
                }}>X</p>
                <p style={{ color: 'white', fontWeight: 'bold' }}>Description has been updated</p>
            </div>
        </>
    )
};

export default BoardSideMenu;