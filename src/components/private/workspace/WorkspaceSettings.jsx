import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const EDIT_URL = 'workspace'
const WorkspaceSettings = ({ workspace }) => {

    const { auth, project, setProject } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const changePrivacy = async (privacyStatus) => {
        try {
            const response = await axiosPrivate.put(`${EDIT_URL}/${workspace._id}`, {
                privacy: privacyStatus
            }, {
                headers: {
                    Authorization: auth.accessToken
                }
            });
            if (response?.status === 200) {
                setProject({
                    ...project,
                    privacy: privacyStatus
                })
                document.querySelector('#privacy-settings').style.display = 'none'
            }
        } catch (error) {
            console.error(error);
        }
    }

    const showDeleteModal = (e) => {
        const deleteModal = document.querySelector('#delete-workspace');
        deleteModal.showModal();
    }

    const deleteWorkspace = async (e) => {
        e.preventDefault();
        const workspaceName = e.target.workspaceName.value;
        if (workspace.title === workspaceName) {
            try {
                const response = await axiosPrivate.delete(`${EDIT_URL}/${workspace._id}`, {
                    headers: {
                        Authorization: auth.accessToken
                    }
                });
                if (response?.status === 200){
                    navigate('/home');
                    window.location.reload();
                    setProject({});
                }
            } catch (error) {
                console.error(error?.response?.data);
            }
        }
    }

    return (
        <>
            <h2>Workspace settings</h2><br />
            <div style={{ position: 'relative' }}>
                <h3>Workspace visibility</h3>
                <h5 style={{ cursor: 'pointer', display: 'inline-block' }} onClick={e => {
                    if (document.querySelector('#privacy-settings').style.display === 'block') {
                        document.querySelector('#privacy-settings').style.display = 'none'
                    } else if (document.querySelector('#privacy-settings').style.display = 'none') {
                        document.querySelector('#privacy-settings').style.display = 'block'
                    }
                }} >Edit privacy</h5>
                <div id="privacy-settings">
                    <ul id="privacy-settings_list">
                        <li onClick={e => changePrivacy('public')}>
                            <div className="list-icon">
                                <img src="/img/tierra.png" alt="public" />
                            </div>
                            <p>This Workspace is public. It's visible to anyone with the link and will show up in search engines like Google.</p>
                        </li>
                        <li onClick={e => changePrivacy('private')}>
                            <div className="list-icon" >
                                <img src="/img/candado.png" alt="private" />
                            </div>
                            <p>This Workspace is private. It's not indexed or visible to those outside the Workspace.</p>
                        </li>
                    </ul>
                </div>
            </div><hr />
            <div className="privacy_workspace">
                <img src={workspace.privacy === 'public' ? '/img/tierra.png' : '/img/candado.png'} alt="privacy" />
                <p style={{ textTransform: 'capitalize' }}>{workspace.privacy}</p>
            </div>
            <p style={{ textTransform: 'capitalize' }}>
                {workspace.privacy === 'private' ? "This Workspace is private. It's not indexed or visible to those outside the Workspace" : "This Workspace is public. It's visible to anyone with the link and will show up in search engines like Google. Only those invited to the Workspace can add and edit Workspace boards."}
            </p>
            <div>
                <button onClick={showDeleteModal}>Delete this workspace</button>
            </div>
            <dialog id="delete-workspace">
                <h2>Are you sure?</h2><hr />
                <h3 style={{ textAlign: 'start' }}>Enter the Workspace name "{workspace.title}" to delete</h3>
                <div style={{ textAlign: 'start', marginTop: '10px' }}>
                    <h4>Things to know:</h4>
                    <ul style={{ paddingLeft: '10px', fontFamily: 'var(--font)' }}>
                        <li>This is permanent and can't be undone.</li>
                        <li>All boards in this Workspace will be closed.</li>
                        <li>Board admins can reopen boards.</li>
                        <li>Board members will not be able to interact with closed boards.</li>
                    </ul>
                    <form method="dialog" onSubmit={deleteWorkspace}>
                        <input style={{ width: '100%' }} type="text" placeholder="Enter workspace name to delete" name="workspaceName" />
                        <button className="delete-btn">Delete</button>
                    </form>
                </div>
            </dialog>
        </>
    )
}

export default WorkspaceSettings;