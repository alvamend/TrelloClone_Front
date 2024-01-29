import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

const CREATE_WORKSPACE_URL = 'workspace';
const CREATE_BOARD_URL = 'board';
const Create = ({ workspaces, setWorkspaces }) => {

    const { auth } = useAuth();
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const [list, setList] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    useEffect(() => {
        const modal = document.querySelector('.modal-background');
        window.onclick = function (event) {
            if (event.target === modal) {
                cleanUp();
            }
        }
    }, []);

    useEffect(() => {
        setList(workspaces);
    }, [workspaces])

    const createWorkspace = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosPrivate.post(CREATE_WORKSPACE_URL, {
                title: e.target.title.value,
                privacy: e.target.privacy.value
            }, {
                headers: {
                    Authorization: auth.accessToken
                }
            });
            if (response?.status === 201) {
                setSuccess(true);
                setMessage(`Workspace created successfully`)
                setWorkspaces(workspaceList => [...workspaceList, response?.data?.workspace])
            }
        } catch (error) {
            console.error(error);
        }

        e.target.title.value = '';
        e.target.privacy.value = 'private'
    }

    const createBoard = async (e) => {
        e.preventDefault();
        const description = e.target.description.value;
        const workspaceRef = e.target.workspace.value;
        let body = {
            title: e.target.titleboard.value,
            privacy: e.target.privacyboard.value,
            workspaceRef: workspaceRef
        };
        if (description) {
            body = {
                ...body,
                description: description
            }
        };

        try {
            const response = await axiosPrivate.post(CREATE_BOARD_URL, body, {
                headers: {
                    Authorization: auth.accessToken
                }
            });
            if (response?.status === 201) {
                setSuccess(true);
                setMessage('Board created successfully')
            }
        } catch (error) {
            console.error(error);
        }

        e.target.titleboard.value = '';
        e.target.description.value = '';
        e.target.privacyboard.value = 'private';
    }

    const addMember = async (e) => {
        e.preventDefault();
        console.log(e.target.email.value)
        console.log(e.target.workspaceRole.value);
        console.log(e.target.workspaceMember.value);
        try {
            const response = await axiosPrivate.put(`${CREATE_WORKSPACE_URL}/add-member/${e.target.workspaceMember.value}`, {
                email: e.target.email.value,
                workspaceRole: e.target.workspaceRole.value
            }, {
                headers: {
                    Authorization: auth.accessToken
                }
            });
            if (response?.status === 200) {
                setSuccess(true);
                setMessage('User added to the workspace');
            }
        } catch (error) {
            if (error?.response?.status === 400) {
                setSuccess(true);
                setMessage(error?.response?.data?.message[0])
            }
            if (error?.response?.status === 401) {
                setSuccess(true);
                setMessage('Only admins can add members')
            }
            if (error?.response?.status === 404) {
                setSuccess(true);
                setMessage(error?.response?.data?.message);
            }
            if (error?.response?.status === 403) {
                navigate('/login');
            }
        }
    };

    const cleanUp = () => {
        document.querySelector('.modal-background').style.display = 'none';
        document.querySelector('#create-workspace').style.display = 'none';
        document.querySelector('#create-board').style.display = 'none';
        document.querySelector('#add-member').style.display = 'none';
        document.getElementsByName('title')[0].value = '';
        document.getElementsByName('titleboard')[0].value = '';
        document.getElementsByName('description')[0].value = '';
        document.getElementsByName('email')[0].value = '';
        setMessage('');
        setSuccess(false);
    }

    return (
        <div className="modal-background">
            <div className="modal-content">
                <span className="close" onClick={e => cleanUp()}>&times;</span>
                <section id="create-workspace">
                    <h1>Create Workspace</h1>
                    {!success
                        ? ''
                        : <div className="instructions" style={{ marginTop: '10px' }}>
                            <p style={{ textAlign: 'center' }}>{message}</p>
                        </div>
                    }
                    <form className="create-form" onSubmit={createWorkspace}>
                        <div className="create-item">
                            <label htmlFor="title">Title</label>
                            <input type="text" name="title" required minLength='3' />
                        </div>
                        <div className="create-item">
                            <label htmlFor="privacy">Privacy</label>
                            <select defaultValue='private' name="privacy">
                                <option value='private'>Private</option>
                                <option value='public'>Public</option>
                            </select>
                        </div>
                        <input type="submit" value='Create' />
                    </form>
                    <p>Note: Default value for privacy is Private, you can change settings later</p>
                </section>

                <section id="create-board">
                    <h1>Create Board</h1>
                    {!success
                        ? ''
                        : <div className="instructions" style={{ marginTop: '10px' }}>
                            <p style={{ textAlign: 'center' }}>{message}</p>
                        </div>
                    }
                    <form className="create-form" onSubmit={createBoard}>
                        <div className="create-item">
                            <label htmlFor="titleboard">Board Title</label>
                            <input type="text" name="titleboard" required minLength='3' />
                        </div>
                        <div className="create-item">
                            <label htmlFor="description">Description</label>
                            <input type="text" name="description" minLength='3' />
                        </div>
                        <div className="create-item">
                            <label htmlFor="workspace">Workspace</label>
                            <select defaultValue='default' name="workspace">
                                {list.length > 0 && (
                                    list.map(item => (
                                        <option key={item._id} value={item._id}>{item.title}</option>
                                    ))
                                )}
                            </select>
                        </div>
                        <div className="create-item">
                            <label htmlFor="privacyboard">Privacy Board</label>
                            <select defaultValue='private' name="privacyboard">
                                <option value='private'>Private</option>
                                <option value='workspace'>Workspace</option>
                                <option value='public'>Public</option>
                            </select>
                        </div>
                        <input type="submit" value='Create Board' />
                    </form>
                    <p>Note: Default Workspace means that the board will be created under User's personal workspace</p>
                </section>

                <section id="add-member">
                    <h1>Add Member</h1>
                    {
                        success
                            ? <div className="instructions" style={{ marginTop: '10px' }}>
                                <p style={{ textAlign: 'center', textTransform: 'capitalize' }}>{message}</p>
                            </div>
                            : ''
                    }
                    <form className="create-form" onSubmit={addMember}>
                        <div className="create-item">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" required minLength='3' />
                        </div>
                        <div className="create-item">
                            <label htmlFor="workspaceRole">Role</label>
                            <select defaultValue='collaborator' name="workspaceRole">
                                <option value='collaborator'>Collaborator</option>
                                <option value='administrator'>Administrator</option>
                            </select>
                        </div>
                        <div className="create-item">
                            <label htmlFor="workspaceMember">Workspace</label>
                            <select defaultValue='default' name="workspaceMember">
                                {list.length > 0 && (
                                    list.map(item => (
                                        <option key={item._id} value={item._id}>{item.title}</option>
                                    ))
                                )}
                            </select>
                        </div>
                        <input type="submit" value='Add Member' />
                    </form>
                    <p>Note: Administrator role allows the user to perform any kind of changes, Collaborator is read-only</p>
                </section>
            </div>
        </div>
    )
}

export default Create;